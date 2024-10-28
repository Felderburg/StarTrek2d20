import { Header } from "./header";

const HomePageAnnouncement = () => {
    if (false) {
        return undefined;
    } else {
        return (<div className="my-4">
                <Header level={2}>Patreon</Header>
                <p>
                    I've spent a few years poo-poo-ing the idea of a crowdfunding model like Patreon. {' '}
                    <a href="https://github.com/bcholmes/StarTrek2d20/discussions/236" target="_blank"  rel="noreferrer">I'm
                    currently in the process of re-evaluating my position on that</a>. Have thoughts on
                    that? I'd love to hear them.
                </p>
                <p className="text-end">- BC</p>
            </div>);
    }
}

export default HomePageAnnouncement;