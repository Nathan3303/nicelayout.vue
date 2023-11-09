<template>
    <div class="test">
        <nl-div justify-content="space-between">
            <nl-link href="/">
                <nl-avatar src="/images/users/nathan.png"></nl-avatar>
            </nl-link>
            <nl-link href="http://www.baidu.com" theme="button" icon="icon-arrow-right"> www.baidu.com </nl-link>
        </nl-div>
        <nl-div vertical>
            <nl-link href="/">
                <nl-avatar src="/images/users/nathan.png"></nl-avatar>
            </nl-link>
            <nl-link href="http://www.baidu.com" theme="button" icon="icon-arrow-right"> www.baidu.com </nl-link>
        </nl-div>
    </div>
</template>

<style scoped>
.test {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>
