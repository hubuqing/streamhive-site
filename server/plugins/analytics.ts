export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.bodyAppend.push(
      '<script charset="UTF-8" id="LA_COLLECT" src="https://sdk.51.la/js-sdk-pro.min.js"></script>',
      '<script>LA.init({id:"LNL4uhzYDW8pqe3R",ck:"LNL4uhzYDW8pqe3R"})</script>'
    )
  })
})