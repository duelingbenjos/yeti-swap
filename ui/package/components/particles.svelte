<script>import { onMount } from "svelte";
import { loadFull } from "tsparticles";
let ParticlesComponent;
export let bg_color;
export let particles_color;
export let triangles = false;
export let screen_width;
export let speed = 2;
export let distance = 150;
export let particles_number = [50, 120];
let particlesConfig = {
  particles: {
    color: {
      value: particles_color
    },
    links: {
      distance: screen_width < 1e3 ? distance : distance * 2,
      enable: true,
      triangles: {
        enable: triangles,
        opacity: 0.05
      },
      color: {
        value: particles_color
      }
    },
    size: {
      value: 2
    },
    move: {
      enable: true,
      speed
    },
    number: {
      limit: screen_width < 1e3 ? particles_number[0] : particles_number[1],
      value: screen_width < 1e3 ? particles_number[0] : particles_number[1]
    }
  },
  background: {
    color: bg_color
  },
  preset: "triangles"
};
let onParticlesLoaded = (event) => {
  const particlesContainer = event.detail.particles;
  console.log(particlesContainer);
};
let particlesInit = async (engine) => {
  await loadFull(engine);
};
</script>
<div>
	<svelte:component
		this={ParticlesComponent}
		id="tsparticles"
		options={particlesConfig}
		on:particlesLoaded={onParticlesLoaded}
		{particlesInit}
	/>
</div>

<style>
</style>
