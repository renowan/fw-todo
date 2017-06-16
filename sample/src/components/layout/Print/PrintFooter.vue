<template>
  <div>
    <p class="m-print-notice">
        本文書に含まれている情報は、指定された受領者のみによる使用を意図しており、秘密情報を含む場合があります。 本文書の第三者への公開、転載、転送およびその他の使用は禁止されていることをご了承ください。 万一、本文書を誤って受領された場合には、直ちに株式会社ぐるなびに通知し、第三者に公開および複製することなく破棄していただきますようお願い申し上げます。
    </p>

    <div class="m-print-footer">株式会社ぐるなび http://www.gnavi.co.jp/<br>お問合せ先 ぐるなびサポートセンター　0120-22-9672(営業時間:平日10:00～18:00)</div>
  </div>
</template>

<script>
export default {
  name: 'print-footer',
  props: [],
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.m-print-notice {
    font-size: 12px;
    margin-bottom: 10px;
    padding: 12px 4px;
    color: #666;
    //border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
}
.m-print-footer {
    font-size: 11px;
    margin: 0 4px;
    color: #666;
}
</style>
