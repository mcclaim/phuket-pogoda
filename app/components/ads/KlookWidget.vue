<template>
  <ClientOnly>
    <div ref="root">
      <ins
        class="klk-aff-widget"
        data-adid="1163508"
        data-lang=""
        data-currency=""
        data-cardH="126"
        data-padding="92"
        data-lgH="470"
        data-edgeValue="655"
        data-cid="7"
        data-tid="-1"
        data-amount="4"
        data-prod="dynamic_widget"
      >
        <a href="https://www.klook.com/">Klook.com</a>
      </ins>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const SCRIPT_ID = "klook-widget-script";
const SCRIPT_SRC = "https://affiliate.klook.com/widget/fetch-iframe-init.js";

onMounted(() => {
  // защита от дублирования
  if (document.getElementById(SCRIPT_ID)) {
    // если скрипт уже загружен — возможно нужно инициировать виджет вручную
    const w = window as any;
    if (w.klookWidgets && typeof w.klookWidgets.init === "function") {
      try {
        w.klookWidgets.init();
      } catch {}
    }
    return;
  }

  // вставляем скрипт перед первым <script> (как в вашем IIFE)
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.type = "text/javascript";
  s.async = true;
  s.src = SCRIPT_SRC;

  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript && firstScript.parentNode)
    firstScript.parentNode.insertBefore(s, firstScript);
  else document.head.appendChild(s);
});
</script>
