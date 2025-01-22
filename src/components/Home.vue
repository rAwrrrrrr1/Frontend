<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 d-flex align-items-center">
            <!-- <img src="assets/Wins.png" alt="Logo" class="logo me-2" /> -->
            WinsArena
        </a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </header>
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{ name: 'transaksi' }" class="nav-link">Transaksi</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'system' }" class="nav-link">System</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="fieldDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Lapangan
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="fieldDropdown">
                                <li><router-link :to="{ name: 'badminton' }" class="dropdown-item">Badminton</router-link></li>
                                <li><router-link :to="{ name: 'futsal' }" class="dropdown-item">Futsal</router-link></li>
                                <li><router-link :to="{ name: 'minisoccer' }" class="dropdown-item">Mini Soccer</router-link></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'user' }" class="nav-link">User</router-link>
                        </li>
                    </ul>
                </div>
                <div class="position-bottom pt-3">
                    <ul>
                        <li class="nav-item">
                            <router-link @click.prevent="logout()" :to="{ name: 'login' }" class="nav-link">Log Out</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            // Tambahkan logika logout di sini
            console.log("Logout berhasil");
        }
    }
};
</script>

<style>
/* Tambahkan background logo pada body */
body {
    font-size: 0.875rem;
    background-image: url('./assets/logo.png'); /* Ganti dengan path logo Anda */
    background-size: cover; /* Logo akan memenuhi seluruh layar */
    background-position: center; /* Logo akan berada di tengah */
    background-repeat: no-repeat; /* Mencegah pengulangan */
}

/* Sidebar dengan transparansi */
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.9); /* Transparansi sidebar */
    backdrop-filter: blur(5px); /* Efek blur di belakang sidebar */
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link.active {
    color: #2470dc;
}

/* Navbar */
.navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1.25rem;
    background-color: rgba(0, 0, 0, 0.5); /* Transparansi navbar */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.navbar .navbar-toggler {
    top: 0.25rem;
    right: 1rem;
}

/* Gaya logo di navbar */
.logo {
    height: 30px; /* Sesuaikan ukuran tinggi logo */
    width: auto;  /* Mempertahankan rasio aspek logo */
    margin-right: 8px; /* Memberikan jarak dengan teks */
}

/* Form */
.navbar .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
}

.form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
