<template>
<span class="kafs00subp3">
    <span class="uk-text-excess-time-none">
        <span class="far fa-clock display-time child-font-size"></span>
        <span v-if="params.applicationAchievementAtr==ApplicationAchievementAtr.APPLICATION">{{'KAFS00_25' | i18n}}</span>
        <span v-else>{{'KAFS00_26' | i18n}}</span>
        <span>[</span>
        <span>{{ startTime || i18n }}</span>
        <span> ~ </span>
        <span>{{ endTime || i18n }}</span>
        <span>]</span>
    </span>
</span>
</template>