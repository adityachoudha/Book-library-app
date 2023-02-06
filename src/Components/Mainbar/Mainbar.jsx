import "./Mainbar.css";


export default function Mainbar(props){

  const defaultSrc = "../not.jpg";
    const src = props.cover_id ? `https://covers.openlibrary.org/b/id/${props.cover_id}-L.jpg` : defaultSrc;

  return(
    <div className="book">
      <img src={src} alt="Cover Image"/>
      <p><b>{props.title}</b></p>
      <p><b>{props.author}</b></p>
      <p><b>{props.publish}</b></p>
    </div>  
  )
}