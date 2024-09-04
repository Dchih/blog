export const checkVersion = async () => {
  // 对比 import.meta.env.VERSION_TIME 与 public/VERSION_TIME.json.data
  const publicVersion = await fetch(location.origin + `/version.json?t=` + Date.now(), {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '-1'
    }
  })
  const data = await publicVersion.json()
  const NEW_VERSION_TIME = data.VERSION_TIME
  const VERSION_TIME = import.meta.env.VERSION_TIME

  if (import.meta.env.DEV) {
    return
  }
  if (NEW_VERSION_TIME && new Date(NEW_VERSION_TIME) > new Date(VERSION_TIME)) {
    // updateVersion()
    location.reload()
  }
}


export const updateVersion = (count: number = 30) => {
  let timer: any = setTimeout(() => {
    count--
    if (count < 1) {
      clearTimeout(timer!)
      timer = null
      location.reload()
    }
  }, 1000)
}
