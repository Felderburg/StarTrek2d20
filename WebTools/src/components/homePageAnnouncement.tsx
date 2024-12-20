import { Header } from "./header";

const HomePageAnnouncement = () => {
    if (false) {
        return undefined;
    } else {
        return (<div className="my-4">
                <Header level={2}>Patreon</Header>
                <p>
                    <a href="https://patreon.com/bcholmes?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
                        target="_blank"  rel="noreferrer">Support me on Patreon</a>. Only if that's
                        convenient for you. No pressure.
                </p>
                <p className="text-end">- BC</p>
            </div>);
    }
}

export default HomePageAnnouncement;