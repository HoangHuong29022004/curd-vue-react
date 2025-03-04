<template>
  <div>
    <!-- Nav bar -->
    <nav class="navbar navbar-dark bg-info justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a href="/" class="navbar-brand float-left">ỨNG DỤNG QUẢN LÝ CỬA HÀNG MỸ PHẨM</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">QUẢN LÝ NHÂN VIÊN</router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/products">QUẢN LÝ SẢN PHẨM</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/categories">DANH MỤC SẢN PHẨM</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/shifts">QUẢN LÝ CA LÀM</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/create"><i class="fa-solid fa-right-to-bracket"></i></router-link>
          </li> -->
        </ul>
      </div>
    </nav>
    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>