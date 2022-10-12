# load-script

```ts
export const loadScript = async (props: ILoadScriptProps) => {
  const options: ILoadScriptProps = {
    base: getNpmCDNRegistry(),
    ...props,
  }
  if (globalThis[props.root]) return globalThis[options.root]
  const path = `${options.base}/${options.package}/${options.entry}`
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = false
    script.src = path
    script.onload = () => {
      const module = globalThis[options.root]
      globalThis['define'] = define
      resolve(module)
      script.remove()
    }
    script.onerror = (err) => {
      reject(err)
    }
    const define = globalThis['define']
    globalThis['define'] = undefined
    document.body.appendChild(script)
  })
}
```
