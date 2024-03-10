<template>
    <div class=" homepage-wrapper">
        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 ">
                <a href="/"
                    class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">

                    <span class="fs-4"> <img src="/recipe-hub-logo.jpg" width="100"></span>
                </a>

                <ul class="nav">
                    <li class="nav-item home-nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
                    <li class="nav-item home-nav-item"> <router-link to="login" class="nav-link">Login</router-link></li>
                    <li class="nav-item home-nav-item"> <router-link to="register" class="nav-link">Register</router-link>
                    </li>

                </ul>
            </header>
        </div>





        <div class="vue-container">

            <a-row class="hompage-hero">
                <a-col :span="12">
                    <div>
                        <h2 class="homepage-h2">Share</h2>
                        <h2 class="homepage-h2 "><span class="root-orange">Recipes</span> with</h2>
                        <h2 class="homepage-h2">Everyone</h2>
                        <p class="muted-text">Share recipes with recipe seekers.<br /> Join as a Chef or Recipe Seeker</p>


                        <router-link to="register"><a-button type="primary" shape="round" html-type="submit" value="large"
                                size="large" class="blue-register-button"
                                :style="{ backgroundColor: '#ff800b' }">Register</a-button></router-link>

                    </div>
                </a-col>
                <a-col :span="12">

                    <img src="/img/vale-pepper.png" width="500"></a-col>
            </a-row>


        </div>
    </div>
</template>