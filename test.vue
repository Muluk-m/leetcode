<style scoped>
  .ball {
    position: relative;
    width: 20px;
    height: 20px;
    background-color: green;
    border-radius: 50%;
    animation: ballmove 5s infinite;
  }
  @keyframes ballmove {
    0%{
      left: 0;
      transform: rotate(0deg);
    }
    100%{
      left: 200;
      transform: rotate(0deg);
    }
  }
</style>