<template>
  <div
    id="tripster-in-article-widget-container"
    class="test col sm:col-span-2 lg:col-span-3"
  >
    <!-- Tripster Left Widget will be loaded here -->
  </div>
</template>
<script setup>
import { onMounted } from "vue";

const props = defineProps({
  adsCount: { type: [String, Number], default: "3" },
});

const SCRIPT_ID = "tripster-widget-499633";
const SCRIPT_SRC = `https://experience.tripster.ru/partner/widget.js?country=thailand&view=tour&template=horizontal&mobile=list&order=top&num=${String(props.adsCount)}&label=in_article_list&version=2&partner=phuket-pogoda&script_id=tripster-widget-499633&type=tour`;

onMounted(() => {
  const container = document.getElementById(
    "tripster-in-article-widget-container"
  );
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
