//
// Help functions
//

//  payload template
function payloadJSON (body) {
  return {
    error: false,
    errorBody: {},
    body: body
  }
}

module.exports = {
  payloadJSON: payloadJSON
}
