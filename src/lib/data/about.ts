import laurel from '$lib/imgs/doodles/laurel.svg';
import creating from '$lib/imgs/doodles/creating.svg';
import world from '$lib/imgs/doodles/world.svg';
import arch from '$lib/imgs/doodles/arch.svg';
import freeTime from '$lib/imgs/doodles/free_time.svg';

export const descriptions: { desc: string; img: string; cls: string }[] = [
    {
        desc: `My name is <span class="text-ocean font-bold">Emir Wanes Aouioua</span>. I'm 24, and I've just finished all my exams for my B.Sc. in
				Computer Science and Engineering. I'll defend my thesis in October and finally call it
				done.`,
        img: laurel,
        cls: 'lg:w-50 w-50'
    },
    {
        desc: `I've always been driven by a simple curiosity: understanding how things work, and then
				building something with that knowledge. Computer science turned out to be the perfect outlet
				for that. It's one of the few disciplines where you can start from nothing and end up with
				something that actually works, in an afternoon.`,
        img: creating,
        cls: 'lg:w-60 w-60'
    },
    {
        desc: `My thesis involves rebuilding the data layer of <a href="https://alchemistsimulator.github.io/" target="_blank" class="underline text-ocean hover:text-blaze">Alchemist</a>, an open source physical
				simulator developer at the University of Bologna, to support GeoTIFF and Copernicus EU datasets.
				It's a project I'm genuinely looking forward to.`,
        img: world,
        cls: 'lg:w-50 w-50'
    },
    {
        desc: `I don't really have a single area I focus on. Distributed systems, security,
				containerization, simulations... I find most of it interesting, and I like that the field is
				broad enough to never get boring.`,
        img: arch,
        cls: 'w-full lg:w-130'
    },
    {
        desc: `Outside of code I game, read, watch series, work out, and follow way too many rabbit holes about
				science and tech.`,
        img: freeTime,
        cls: 'lg:w-45 w-40'
    }
];
