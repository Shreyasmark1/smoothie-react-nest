import smoothie from "../assets/smoothie.png"

const Home = () => {

    return (
            <header>
                <div className="smoothie">
                    <img src={smoothie} alt="smoothie-img" />
                </div>
                <div class="headings">
                    <h2>Smoothie Point</h2>
                    <h3>By Shreyas</h3>
                    <a href="/smoothies" class="btn">Shop</a>
                </div>
            </header>
    );
}

export default Home;