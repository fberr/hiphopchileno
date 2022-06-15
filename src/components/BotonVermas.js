import React, { useState, useContext} from 'react';
import { DataContext } from './DataContext';

export default function BotonVermas({ token, setToken }) {

    const { post, setPost } = useContext(DataContext);
    const [moreload, setMoreload] = useState(false)
 

    const next = async () => {

        setMoreload(true)

        if(token) {
            const response  = await fetch(
                `https://www.googleapis.com/blogger/v3/blogs/4209688436429267338/posts?labels=hip+hop+chileno,videos&maxResults=12&pageToken=${token}&key=AIzaSyBenGb4BOSSx8_G9Ec2ONZY12Dmu4TwIy8`
                ).then((response) => response.json())
                .then(data => { 
                    
                    setPost(post.concat(data.items));
                    setToken(data.nextPageToken);
                    
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
