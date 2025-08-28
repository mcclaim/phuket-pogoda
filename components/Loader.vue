<script lang="ts" setup></script>

<template>
  <div class="glass loader">
    <div class="loader__container">
      <div class="loader__cloud loader__front">
        <span class="loader__left-front"></span>
        <span class="loader__right-front"></span>
      </div>
      <span class="loader__sun loader__sunshine"></span>
      <span class="loader__sun"></span>
      <div class="loader__cloud loader__back">
        <span class="loader__left-back"></span>
        <span class="loader__right-back"></span>
      </div>
    </div>
    <div class="text-2xl text-center pt-0 p-4 animate-pulse">
      Загружаем для Вас погоду...
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  &__container {
    width: 250px;
    height: 200px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cloud {
    width: 250px;
  }

  &__front {
    padding-top: 45px;
    margin-left: 25px;
    display: inline;
    position: absolute;
    z-index: 11;
    animation: clouds 8s infinite;
    animation-timing-function: ease-in-out;
  }

  &__back {
    margin-top: -30px;
    margin-left: 150px;
    z-index: 12;
    animation: clouds 12s infinite;
    animation-timing-function: ease-in-out;
  }

  &__right-front {
    width: 45px;
    height: 45px;
    border-radius: 50% 50% 50% 0%;
    background-color: #adefff;
    display: inline-block;
    margin-left: -25px;
    z-index: 5;
  }

  &__left-front {
    width: 65px;
    height: 65px;
    border-radius: 50% 50% 0% 50%;
    background-color: #adefff;
    display: inline-block;
    z-index: 5;
  }

  &__right-back {
    width: 50px;
    height: 50px;
    border-radius: 50% 50% 50% 0%;
    background-color: #adefff;
    display: inline-block;
    margin-left: -20px;
    z-index: 5;
  }

  &__left-back {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 0% 50%;
    background-color: #adefff;
    display: inline-block;
    z-index: 5;
  }

  &__sun {
    width: 120px;
    height: 120px;
    background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
    background: linear-gradient(to right, #fcbb04, #fffc00);
    border-radius: 60px;
    display: inline;
    position: absolute;
  }

  &__sunshine {
    animation: sunshines 2s infinite;
  }
}

@keyframes sunshines {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

@keyframes clouds {
  0% {
    transform: translateX(15px);
  }

  50% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(15px);
  }
}
</style>
