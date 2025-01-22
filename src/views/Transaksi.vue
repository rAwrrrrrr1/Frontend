<template>
  <div>
    <h2>Transaction List</h2>

    <!-- Dropdown untuk memilih bulan -->
    <div>
      <label for="monthSelect">Pilih Bulan: </label>
      <select id="monthSelect" v-model="selectedMonth" @change="filterTransactionsByMonth">
        <option value="">Semua Bulan</option>
        <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status Pembayaran</th>
          <th>Tanggal Pembayaran</th>
          <th>No Booking</th>
          <th>ID User</th>
          <th>Total Pembayaran</th>
          <th>Bukti Pembayaran</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredTransactions.length === 0">
          <td colspan="8" style="text-align: center;">No transactions found.</td>
        </tr>
        <tr v-for="transaction in paginatedTransactions" :key="transaction.id">
          <td>{{ transaction.id }}</td>
          <td>{{ transaction.status_pembayaran }}</td>
          <td>{{ transaction.tanggal_pembayaran || '-' }}</td>
          <td>{{ formatNoBooking(transaction) }}</td>
          <td>{{ transaction.id_user }}</td>
          <td>{{ formatRupiah(transaction.total_pembayaran) }}</td>
          <td v-if="transaction.bukti_pembayaran">
            <a :href="`http://172.20.10.5:8000/storage/${transaction.bukti_pembayaran.substring(7)}`" target="_blank">View Image</a>
          </td>
          <td v-else>-</td>
          <td>
            <button
              v-if="transaction.status_pembayaran === 'Menunggu Konfirmasi'"
              @click="confirmPayment(transaction.id)"
            >
              Confirm Payment
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Total Pembayaran -->
    <div v-if="filteredTransactions.length > 0" class="total-payment">
      <h3>Total Pembayaran: {{ formatRupiah(totalPayment) }}</h3>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <!-- Button to generate PDF -->
    <button @click="generatePDF" class="generate-pdf-button">Generate PDF</button>
  </div>
</template>

<script>
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 

export default {
  data() {
    return {
      transactions: [],
      currentPage: 1,
      itemsPerPage: 10,
      selectedMonth: '',
      months: [
        { value: '01', label: 'Januari' },
        { value: '02', label: 'Februari' },
        { value: '03', label: 'Maret' },
        { value: '04', label: 'April' },
        { value: '05', label: 'Mei' },
        { value: '06', label: 'Juni' },
        { value: '07', label: 'Juli' },
        { value: '08', label: 'Agustus' },
        { value: '09', label: 'September' },
        { value: '10', label: 'Oktober' },
        { value: '11', label: 'November' },
        { value: '12', label: 'Desember' },
      ],
    };
  },
  computed: {
    filteredTransactions() {
      if (!this.selectedMonth) {
        return this.transactions; // Jika bulan tidak dipilih, tampilkan semua transaksi
      }
      return this.transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.tanggal_pembayaran).getMonth() + 1; // Mendapatkan bulan dari tanggal pembayaran
        return transactionMonth.toString().padStart(2, '0') === this.selectedMonth; // Memfilter transaksi berdasarkan bulan yang dipilih
      });
    },
    totalPages() {
      return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    },
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTransactions.slice(start, end);
    },
    totalPayment() {
      return this.filteredTransactions.reduce((total, transaction) => {
        return total + (transaction.total_pembayaran || 0);
      }, 0);
    },
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error("No access token found. Please log in.");
        return;
      }

      axios.get('http://172.20.10.5:8000/api/transaksi', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.transactions = response.data.data || response.data;
      })
      .catch(error => {
        console.error("Error fetching transactions:", error.response ? error.response.data : error);
      });
    },
    
    formatRupiah(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value);
    },

    formatNoBooking(transaction) {
      const noBookingBadminton = transaction.no_booking_badminton || '';
      const noBookingFutsal = transaction.no_booking_futsal || '';
      const noBookingSoccer = transaction.no_booking_soccer || '';
      
      return [noBookingBadminton, noBookingFutsal, noBookingSoccer]
        .filter(booking => booking)
        .join(', ') || '-';
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    confirmPayment(transactionId) {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error("No access token found. Please log in.");
        return;
      }

      axios.put(
        `http://172.20.10.5:8000/api/transaksi/confirmation/${transactionId}`, // Adjust endpoint as needed
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        console.log("Payment confirmed:", response.data);
        this.fetchTransactions(); // Refresh the transaction list after confirmation
      })
      .catch(error => {
        console.error("Error confirming payment:", error.response ? error.response.data : error);
      });
    },

    filterTransactionsByMonth() {
      this.currentPage = 1; // Reset to page 1 when filtering
    },
    
    generatePDF() {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Transaction List', 20, 20);

      let yPosition = 30;
      const tableHeaders = ['ID', 'Status Pembayaran', 'Tanggal Pembayaran', 'No Booking', 'ID User', 'Total Pembayaran', 'Bukti Pembayaran'];
      doc.setFontSize(12);

      // Generate the table with autotable plugin
      doc.autoTable({
        startY: yPosition,
        head: [tableHeaders],
        body: this.filteredTransactions.map(transaction => [
          transaction.id,
          transaction.status_pembayaran,
          transaction.tanggal_pembayaran || '-',
          this.formatNoBooking(transaction),
          transaction.id_user,
          this.formatRupiah(transaction.total_pembayaran),
          transaction.bukti_pembayaran ? 'Available' : '-',
        ]),
        margin: { top: 20, left: 10, right: 10 },
        theme: 'striped',
      });

      // Add Total Payment after the table
      const totalPayment = this.totalPayment; // Get total payment value
      yPosition = doc.lastAutoTable.finalY + 10; // Position below the table
      doc.setFontSize(14);
      doc.text(`Total Pembayaran: ${this.formatRupiah(totalPayment)}`, 20, yPosition);

      doc.save('transaction_list.pdf');
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}

.total-payment {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
}

.generate-pdf-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.generate-pdf-button:hover {
  background-color: #45a049;
}
</style>
