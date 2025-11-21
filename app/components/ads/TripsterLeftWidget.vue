<template>
  <div id="tripster-left-widget-container">
    <!-- Tripster Left Widget will be loaded here -->
  </div>
</template>
<script setup>
import { onMounted } from "vue";

const SCRIPT_ID = "tripster-widget-563220";
const SCRIPT_SRC =
  "https://experience.tripster.ru/partner/widget.js?country=thailand&view=experience&template=horizontal&mobile=list&order=top&num=3&label=left_banner&version=2&partner=phuket-pogoda&script_id=tripster-widget-563220";

onMounted(() => {
  const container = document.getElementById("tripster-left-widget-container");
  if (!container) return;

  // если скрипт уже есть — удалим, чтобы корректно вставить заново
  const existing = document.getElementById(SCRIPT_ID);
  if (existing) existing.remove();

  // вставляем скрипт внутрь контейнера — многие виджеты рендерят баннер в месте скрипта
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.type = "text/javascript";
  s.async = true;
  s.src = SCRIPT_SRC;
  container.appendChild(s);

  // fallback: если загрузка скрипта провалится внутри контейнера — вставим перед первым <script>
  s.addEventListener("error", () => {
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode)
      firstScript.parentNode.insertBefore(s, firstScript);
    else document.head.appendChild(s);
  });

  // после загрузки можно попытаться вызвать инициализацию, если библиотека её экспортирует
  s.addEventListener("load", () => {
    // Пример: если библиотека предоставляет глобальную функцию init — раскомментируйте и поправьте имя
    // if (window.tripsterInit) window.tripsterInit();
  });
});
</script>
