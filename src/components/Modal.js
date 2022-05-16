import React from 'react'

export default function Modal() {


// const todoModal = () => {
//     let allButtons = document.querySelectorAll(".box-video");
//     let modalTitle = document.querySelector('.modal-title');
//     let miModal = document.getElementById("exampleModal");
//     let modalIframe = document.querySelector("#exampleModal iframe");
    
//   allButtons.forEach(function (button) {
//         button.addEventListener("click", () => {
//           console.log("Button clicked!");
//           let dataUrl = button.dataset.url;
//           let dataTitle = button.dataset.title;
//           modalTitle.innerText = dataTitle;
//           modalIframe.src = dataUrl;
//           console.log(miModal.children);
//           new bootstrap.Modal(miModal).show();
//       });
//   });
// }



  return (
    <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src=""
                            title="YouTube video"
                            allowFullScreen
                        ></iframe>
                        </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
