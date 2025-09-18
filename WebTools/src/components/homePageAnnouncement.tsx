import { Header } from "./header";

const HomePageAnnouncement = () => {
    if (false) {
        return undefined;
    } else {
        return (<div className="my-4">
                <Header level={2}>Patreon</Header>
                <p>
                    <a href="https://www.patreon.com/bcholmes"
                        target="_blank"  rel="noreferrer">Support me on Patreon</a>. Only if that's
                        convenient for you. No pressure.
                </p>
                <p className="text-end">- BC</p>
            </div>);
    }
}

export default HomePageAnnouncement;