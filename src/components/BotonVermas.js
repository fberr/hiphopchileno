import React, { useState, useEffect,useContext} from 'react';
//import HijoBoton from './HijoBoton';
import YoutubeGetID from './YoutubeGetID';
import { DataContext } from './DataContext';

export default function BotonVermas({ token, setToken }) {

    const { post, setPost } = useContext(DataContext);

    const [moreload, setMoreload] = useState(false)
 

console.log('post del context', post)
    // let ultimoToken = token;
    // let currentToken = token;
    let datos2 = [];
    // let arrayVideos = [];

console.log('token', token);
// console.log('setToken', setToken);
console.log('post', post);
console.log('setPost', setPost);


//let lastItem = token[token.length - 1]

//console.log('lastitem',lastItem)
   

    const next = async () => {

       // let ultimoToken = currentToken[currentToken.length - 1];
        console.log('hola click next');
        // console.log(ultimoToken);
        // console.log(currentToken);


        setMoreload(true)

        if(token) {
            const response  = await fetch(
                `https://www.googleapis.com/blogger/v3/blogs/4209688436429267338/posts?labels=hip+hop+chileno,videos&maxResults=200&pageToken=${token}&key=AIzaSyBenGb4BOSSx8_G9Ec2ONZY12Dmu4TwIy8`
                ).then((response) => response.json())
                .then(data => { 
                    

                    data.items.map( res => {
                        let nuevoTitulo = res.title.replace('descarga','video');
                        let regexIframe = /<iframe.*?src="(.*?)"/;
                        let cadena = res.content;
                        let urlIframe = regexIframe.exec(cadena)[1];
                        let idYoutube = YoutubeGetID(urlIframe);
        
                        let datos3 = {
                            titulo: nuevoTitulo,
                            contenido: res.content,
                            id: res.id,
                            idYoutube: idYoutube
                        }
        
                        datos2.push(datos3);
                    }) 
        
                    

                    setPost(post.concat(data.items));
                    //setToken(data.nextPageToken);
                    setToken(data.nextPageToken);

                    console.log('token', token)
                    console.log('data.nextPageToken', data.nextPageToken)

                    


                    console.log('post', post)
                    setMoreload(false);
                    setTimeout(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                      }, 500);
                   

                   
                })
                .catch(error => {
                    console.error('Error:', error);
                 
                });
        } else {
            console.log('no hay token')
        }
                
                
       

        
    }


    


    




  return (
    <>
        <div id="more-loading" className={moreload ? 'in' : ''}>
	        <div className="spinner-border text-light" role="status">
  			    <span className="visually-hidden">Loading...</span>
	        </div>
        </div>
        {token && 
            <button type="button" onClick={next} className="btn btn-danger next" disabled={moreload}> {moreload ? 'CARGANDO' : 'VER MÁS' }</button>
        }
        
        
    </>
  )
}
