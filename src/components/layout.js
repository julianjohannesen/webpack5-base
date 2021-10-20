import Header from "./header.js";
import Footer from "./footer.js";

export default function Layout({ children }){
    console.log(children);
    return (
        <>
            <Header/>
            {children}
            <Footer />
        </>
    )
}