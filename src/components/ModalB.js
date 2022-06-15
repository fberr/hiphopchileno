export default function ModalB({ modal, exampleModal, info }) {

  return (
    <>

      <div className="modal fade " ref={exampleModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{info && info.titulo}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => modal.hide()} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>

              {info && (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={info && info.urlVideo}
                    data-video={info && info.urlVideo}
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );

}
