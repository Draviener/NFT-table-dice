<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hover: false
    }
  },
  computed: {
    fillOpacity() {
      if (this.hover) {
        return 1
      }
      return 0.6
    }
  }  
}
</script>

<template>
  <g :class="{show: show, hide: !show}" class="menu">
    <defs> 
      <linearGradient id="menu-background" gradientTransform="rotate(90)">
        <stop offset="5%" stop-color="#222222" stop-opacity="1" />
        <stop offset="100%" stop-color="#222222" stop-opacity="1" />
      </linearGradient>
    </defs>
  
    <rect x="-350" y="-350" width="700" height="800" fill="url(#menu-background)" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />

    <rect x="-100" y="-200" width="200" height="200" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      


    <g stroke-width="4" stroke="#ffffff" transform="translate(-270 -250)">
      <rect v-for="n in 10" :x="-20 + n * 50" y="-20" width="40" height="40" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="5" ry="5" />      
    </g>

    <g stroke-width="4" stroke="#ffffff" transform="translate(-200 -100)">
      <line x1="20" y1="-40" x2="-20" y2="0" />
      <line x1="20" y1="40" x2="-20" y2="0" />
    </g>
    <g stroke-width="4" stroke="#ffffff" transform="translate(200 -100)">
      <line x1="-20" y1="-40" x2="20" y2="0" />
      <line x1="-20" y1="40" x2="20" y2="0" />
    </g>

    <g transform="translate(0 150)">
    <rect x="-300" y="0" width="180" height="180" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
    <rect x="-90" y="0" width="180" height="180" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
    <rect x="120" y="0" width="180" height="180" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
    </g>
  </g>
</template>

<style>
  g.show {
    transform: rotate(0deg);
  }
  g.hide {
    transform: rotate(-180deg);
  }
  g.menu {
    transition: transform 0.5s;
    transform-origin: 100% 0%;
  }
</style>
