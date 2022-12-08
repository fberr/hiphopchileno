import React, { useState, useEffect, useRef } from 'react';
import "./Home.css"; 
import BotonVermas from './BotonVermas';
import ModalB from './ModalB';
import YoutubeGetID from './YoutubeGetID';
import { Modal } from 'bootstrap';
import { Provider } from './DataContext';



export default function Home() {

   

const [post, setPost] = useState();


const [token, setToken] = useState([]);
const [info, setInfo] = useState(null);
const [modal, setModal] = useState(null)
const exampleModal = useRef();









    const getApiData = async () => {
        const response = await fetch(
        "https://www.googleapis.com/blogger/v3/blogs/4209688436429267338/posts?labels=hip+hop+chileno,videos&maxResults=12&nextPageToken&key=AIzaSyBenGb4BOSSx8_G9Ec2ONZY12Dmu4TwIy8"
        ).then((response) => response.json())
        .then(data => { 
            setPost(data.items);
          

            setToken(data.nextPageToken);
            
        })
    };

    const EditContent = (contenido) => {

        let regexIframe = /<iframe.*?src="(.*?)"/;
        let cadena = contenido;
        let urlIframe = regexIframe.exec(cadena)[1];
        let idYoutube = YoutubeGetID(urlIframe);

        return [idYoutube, urlIframe];
    }
    

    const abrirModal = (title, url) => { 
        setInfo({ titulo: title, urlVideo: ' ' });
        setTimeout(() => {
            setInfo({ titulo: title, urlVideo: url });
        }, 500);
        
        modal.show();
    }


   


    useEffect(() => {
        
        getApiData();
        setModal(
            new Modal(exampleModal.current)
        )
     
    }, [])

return (
    <>
    <Provider value={{post, setPost}}>
            
            
            <div id="posts" className="row m-0">
                {post && post.map((item) => 
                    (
                        <div key={item.id} className="col-lg-2 col-md-3 col-sm-6 col-6 p-0">
                            <a href={void(0)} onClick={() => abrirModal(item.title,EditContent(item.content)[1] )} className="box-video" data-url={EditContent(item.content)[1]} data-idyt={ EditContent(item.content)[0]} data-title={item.title} style={{backgroundImage: "url(https://img.youtube.com/vi/"+EditContent(item.content)[0]+"/0.jpg)", backgroundSize: "cover"}}>
                                <span className="overlay"></span>
                                <h2>{item.title.replace('descarga','video')}</h2> 
                            </a>
                        </div>
                    ))
                }  
            </div>
            <BotonVermas token={token}  setToken={setToken}></BotonVermas>
            <ModalB modal={modal} exampleModal={exampleModal} info={info} />
        </Provider>
    </>
 
    )
}