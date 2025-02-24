export function gaSearchEdited (params) {
  if (window.dataLayer) {
    const trackingObj = {
      event: 'ga-event',
      eventCategory: 'test example',
      eventAction: 'test',
      eventLabel: ''
    }
    window.dataLayer.push(trackingObj)
  }
}
