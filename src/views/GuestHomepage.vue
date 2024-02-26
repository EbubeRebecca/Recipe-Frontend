<template>
    <div class=" homepage-wrapper">
        <div class="container">

            <a-row class="hompage-hero">
                <a-col :span="12">
                    <div>
                        <h2 class="homepage-h2">Share</h2>
                        <h2 class="homepage-h2 "><span class="root-orange">Recipes</span> with</h2>
                        <h2 class="homepage-h2">Everyone</h2>
                        <p class="muted-text">Share recipes with recipe seekers.</p>
                        <h3>Join as a Chef or Recipe Seeker</h3>
                        <p>Register and login</p>
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