import React from 'react'
import OldFilmsComponents from '../../components/OldFilmsComponent/OldFilmsComponents'

function OldFilmsPage() {
  window.onbeforeunload = function () {
    window.scrollTo(0,0);
};
  return (
    <div><OldFilmsComponents/></div>
  )
}

export default OldFilmsPage