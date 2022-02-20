<script>
export default {
  data () {
    return {
      height: 1200,
      width: 768
    }
  }
}  
</script>

<template>
  <svg
    version="1.1" 
    id="dice-client"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    image-rendering="optimizeQuality"
    fill-rule="evenodd"
    clip-rule="evenodd"
    :width="width"
    :height="height"
    :viewBox="(width / -2 ) + ' ' + (height / -2 ) + ' ' + width + ' ' + height">
    <defs> 
      <linearGradient id="background" gradientTransform="rotate(45)">
        <stop offset="15%" stop-color="#160a1e" stop-opacity="1" />
        <stop offset="150%" stop-color="#1f1f66" stop-opacity="1" />
      </linearGradient>
    </defs>
  
    <rect :x="width / -2" :y="height / -2" :width="width" :height="height" fill="url(#background)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2" rx="25" ry="25" />
      
    <g>
      <slot />
    </g>

  </svg>
</template>


<style>
svg {
}
</style>
