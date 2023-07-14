<script lang="ts">
  import { formatTitle } from "$lib/utils/format-title";
  import { onMount } from "svelte";

  const rand = (n = 1) => Math.random() * n;
  const randV = () => rand(100) + 20;

  type StaticPoint = {
    x: number;
    y: number;
  };

  class Point {
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;

    constructor(private readonly width: number, private readonly height: number) {
      this.x = rand(this.width);
      this.y = rand(this.height);
      this.vx = randV();
      this.vy = randV();
    }

    move(dt: number) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;

      const overLeft = -this.x;
      if (overLeft > 0) {
        this.vx = randV();
        this.x += overLeft;
      }

      const overRight = this.x - this.width;
      if (overRight > 0) {
        this.vx = -randV();
        this.x -= overRight;
      }

      if (this.y < 0) {
        this.vy = randV();
        this.y -= this.y;
      }

      if (this.y > this.height) {
        this.vy = -randV();
        this.y += this.height - this.y;
      }
    }

    toStaticPoint() {
      return {
        x: this.x,
        y: this.y,
      };
    }
  }

  class MovableRect {
    private hue: number;
    private readonly vhue: number;
    private readonly rects: StaticPoint[][];
    private readonly points: Point[];

    constructor(width: number, height: number) {
      this.rects = [];
      this.hue = rand(360);
      this.vhue = rand(30);
      this.points = [];

      for (let i = 0; i < 4; i++) {
        this.points.push(new Point(width, height));
      }
    }

    move(dt: number) {
      for (const p of this.points) {
        p.move(dt);
      }

      this.rects.push(this.points.map((p) => p.toStaticPoint()));
      if (this.rects.length > 5) {
        this.rects.shift();
      }

      this.hue += this.vhue * dt;
      this.hue %= 360;
    }

    draw(ctx: CanvasRenderingContext2D) {
      for (const rect of this.rects) {
        ctx.beginPath();
        ctx.moveTo(rect[0].x, rect[0].y);
        for (let j = 1; j < rect.length; j++) {
          ctx.lineTo(rect[j].x, rect[j].y);
        }
        ctx.closePath();
        ctx.strokeStyle = `hsl(${this.hue}, 50%, 50%)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let rects: MovableRect[];
  let prevT: number;

  onMount(() => {
    ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    rects = [
      new MovableRect(canvas.width, canvas.height),
      new MovableRect(canvas.width, canvas.height),
    ];

    prevT = performance.now();
    requestAnimationFrame(animate);
  });

  function animate(t: number) {
    if (!canvas) {
      return;
    }
    const dt = (t - prevT) * 0.001;
    prevT = t;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const rect of rects) {
      rect.move(dt);
    }

    for (const rect of rects) {
      rect.draw(ctx);
    }

    requestAnimationFrame(animate);
  }
</script>

<svelte:head>
  <title>{formatTitle("Home")}</title>
</svelte:head>

<div class="container">
  <div>
    <h1>Levente Krizsán</h1>
    <h2>Software Engineer</h2>
    <p>Hey, there, I'm Levi! Thanks for stopping by!</p>
    <ul>
      <li>
        <a href="/about">
          <img src="/images/icons/about-me-icon-16.ico" alt="About Me Icon" />About me</a
        >
      </li>
      <li>
        <a href="/uses"
          ><img src="/images/icons/computer-magnifying-glass-16.ico" alt="Uses Icon" />Uses</a
        >
      </li>
      <li><a href="/blog"><img src="/images/icons/blog-16.ico" alt="Blog Icon" />Blog</a></li>
    </ul>
  </div>
  <div class="screensaver-container">
    <img src="/images/computer.png" width="350" alt="computer outline" />
    <canvas bind:this={canvas} width="291" height="211" />
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
  }

  @media (min-width: 728px) {
    .container {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  .screensaver-container {
    position: relative;
  }

  canvas {
    /*border: 1px solid red;*/
    position: absolute;
    left: 27px;
    top: 27px;
  }

  img {
    image-rendering: pixelated;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li img {
    position: relative;
    top: 3px;
    margin-right: 4px;
  }
</style>
