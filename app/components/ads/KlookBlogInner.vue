<template>
  <ClientOnly>
    <ins
      class="klk-aff-widget"
      data-aid="104554"
      data-city_id="7"
      data-country_id="1004"
      data-tag_id="3"
      data-currency="USD"
      data-lang=""
      data-label1=""
      data-label2=""
      data-label3=""
      data-prod="deals_widget"
      data-total="3"
    >
      <a href="//www.klook.com/">Klook.com</a>
    </ins>
  </ClientOnly>
</template>

<script type="text/javascript" setup>
import { onMounted } from "vue";

onMounted(() => {
  (function (d, sc, u) {
    var s = d.createElement(sc),
      p = d.getElementsByTagName(sc)[0];
    s.type = "text/javascript";
    s.async = true;
    s.src = u;
    p.parentNode.insertBefore(s, p);
  })(
    document,
    "script",
    "https://affiliate.klook.com/widget/fetch-iframe-init.js"
  );
});
</script>
