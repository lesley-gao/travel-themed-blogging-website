<!-- page of destinations -->
<script>
</script>

<svelte:head>
  <title>Destinations</title>
</svelte:head>

<!-- Slide 1: Asia -->
<div class="section">
  <a href="/destinations/asia">
    <div class="section-wrapper">
      <div class="fullwidth-video">
        <video class="video-slide" src="/video/asia.mp4" autoplay muted loop />
      </div>

      <div class="content-wrapper">
        <div class="destination">
          <h1>Asia</h1>
        </div>
        <div class="destination-intro">
          <p class="intro-text">
            Asia, the largest and most populous continent, is a mesmerizing blend of ancient
            traditions and cutting-edge technology. From the serene landscapes of Japanese cherry
            blossoms to the bustling markets of India, Asia is a realm of contrasts and harmonies.
            Its cultural heritage, spanning from the Great Wall of China to the temples of Angkor
            Wat, reflects a profound reverence for history, spirituality, and the enduring
            connection between humanity and the natural world.
          </p>
        </div>
      </div>
    </div>
  </a>
  <div class="footer-wrapper animated">
    <div class="footer-text" >
      <p><i class='bx bxs-chevrons-down' style="font-size: 2.5em;"></i><br>
      Scroll down to embark on a journey through the world</p>
    </div>
  </div>
</div>


<!-- Slide 2: Europe -->
<div class="section">
  <a href="/destinations/europe">
    <div class="section-wrapper">
      <div class="fullwidth-video">
        <video class="video-slide" src="/video/europe.mp4" autoplay muted loop />
      </div>

      <div class="content-wrapper">
        <div class="destination">
          <h1>Europe</h1>
        </div>
        <div class="destination-intro">
          <p class="intro-text">
            Europe, a continent steeped in antiquity, exudes an undeniable charm with its
            cobblestone streets, medieval castles, and classical artistry. From the romantic allure
            of Paris to the historic ruins of Rome, Europe's cities are a testament to the enduring
            legacy of centuries past. The continent's diverse cultures, languages, and cuisines
            converge in a celebration of unity within diversity, creating a mosaic of experiences
            that captivate every traveler.
          </p>
        </div>
      </div>
    </div>
  </a>
</div>

<!-- Slide 3: Africa -->
<div class="section">
  <a href="/destinations/africa">
    <div class="section-wrapper">
      <div class="fullwidth-video">
        <video class="video-slide" src="/video/africa.mp4" autoplay muted loop />
      </div>

      <div class="content-wrapper">
        <div class="destination">
          <h1>Africa</h1>
        </div>
        <div class="destination-intro">
          <p class="intro-text">
            Africa, a continent of untamed wilderness and ancient civilizations, evokes a sense of
            primal wonder. The vast Sahara Desert, the majestic Serengeti, and the historic pyramids
            of Egypt are just a few examples of Africa's awe-inspiring landscapes and cultural
            treasures. As the cradle of humanity, Africa's rich diversity of wildlife and cultures
            tell a story of resilience, strength, and the enduring spirit of a continent that has
            witnessed the passage of time like no other.
          </p>
        </div>
      </div>
    </div>
  </a>
</div>

<!-- Slide 4: America -->
<div class="section">
  <a href="/destinations/america">
    <div class="section-wrapper">
      <div class="fullwidth-video">
        <video class="video-slide" src="/video/america.mp4" autoplay muted loop />
      </div>

      <div class="content-wrapper">
        <div class="destination">
          <h1>America</h1>
        </div>
        <div class="destination-intro">
          <p class="intro-text">
            North and South America together form a symphony of geographical grandeur, where the
            soaring peaks of the Rockies and the vast expanse of the Amazon Rainforest converge to
            create a canvas of unparalleled diversity. From the ethereal glow of the Northern Lights
            in Alaska to the rhythmic sway of Brazilian Carnivals, the Americas are a tapestry woven
            with threads of cultural richness and natural splendor. As the sun sets over the Grand
            Canyon, casting hues of orange and red upon its ancient walls, one can't help but feel
            the pulse of a continent that seamlessly blends the wonders of the natural world with
            the vibrant spirit of its people.
          </p>
        </div>
      </div>
    </div>
  </a>
</div>

<!-- Slide 5: Oceania -->
<div class="section">
  <a href="/destinations/oceania">
    <div class="section-wrapper">
      <div class="fullwidth-video">
        <video class="video-slide" src="/video/oceania.mp4" autoplay muted loop />
      </div>

      <div class="content-wrapper">
        <div class="destination">
          <h1>Oceania</h1>
        </div>
        <div class="destination-intro">
          <p class="intro-text">
            Oceania, a realm of enchanting tranquility and pristine beauty, unfolds its story across
            a scattered mosaic of islands in the vast expanse of the Pacific. With coral reefs
            teeming with kaleidoscopic life beneath crystal-clear waters and emerald-green
            landscapes stretching to meet endless azure skies, Oceania is a poetic ode to nature's
            splendor. Each palm-fringed atoll and volcanic peak bears witness to the ancient tales
            of indigenous cultures, their traditions intricately woven into the fabric of the land.
            The rhythmic dance of the hula in Hawaii and the haunting melodies of the didgeridoo in
            the Australian Outback resonate with the heartbeat of a region where the whispers of the
            wind carry the echoes of time and the spirit of the Pacific embraces all who venture
            into its embrace.
          </p>
        </div>
      </div>
    </div>
  </a>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  a {
    text-decoration: none;
  }

  .section-wrapper {
    background: #ddf2fd; /* in case the video won't load */
    padding: 0 200px;
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 1.1em;
    color: white;
  }

  /*style of video div*/
  .video-slide {
    z-index: 000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /*create a background overlay to reduce saturation*/
  .fullwidth-video::before {
    z-index: 777;
    content: "";
    position: absolute;
    background: rgba(221, 242, 253, 0.2);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  video {
    object-fit: contain;
    overflow: clip;
  }

  /*style of content div*/
  .content-wrapper {
    display: block;
    z-index: 999;
    margin: 150px 200px 0px 200px;  
    transition: all 0.3s; 
  }

  .content-wrapper:hover{
    transform: scale(1.05);
  }

  h1 {
    font-size: 4em;
    font-weight: bold;
    text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  }
 

  /*style of footer*/
  .footer-wrapper {
    position: absolute;
    z-index: 999;
    bottom: 20px;
    display: block;
    width: 50%;
    border-radius: 30px;
    background-color: rgb(255, 255, 255, 0.3);
    margin: 0 25%;
  }

  .footer-wrapper:hover {
    transform: scale(1.05);
  }

  /* use CSS's `@keyframes` rule and the `animation` property to add a flashing effect. */
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  .footer-text p {
    color: white;
    text-align: center;
    font-size: 1em;
    text-shadow: 2px 4px 8px rgba(255, 255, 255, 0.5);
    animation: blink 1s infinite;
  }

  /* add media query */
  @media (max-width: 700px) {
    .section-wrapper {
      padding: 0;
    }

    .content-wrapper {
      margin-top: 180px;
      padding: 0;
    }

    .footer-text{
      font-size: 0.8em;
    }
  }

  @media (min-width: 700px), (max-width: 900px) {
   .section-wrapper {
      padding: 0;
    }
  }
</style>
