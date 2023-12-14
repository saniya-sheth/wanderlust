
      let mapToken = "pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ";
      
      let coordinates = "<%-JSON.stringify(listing.geometry.coordinates)%>";
      mapboxgl.accessToken = mapToken;
      const map = new mapboxgl.Map({
      container: "map", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [77.209, 28.6139], // starting position [lng, lat]
      zoom: 9 // starting zoom
      });

      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);