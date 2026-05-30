import { getRandomIntInclusive } from "$lib/utility/utils";

export default class Particle {
    // current position in canvas pixel space
    x: number;
    y: number;

    // current velocity in pixels per frame
    vx: number;
    vy: number;

    radius: number;

    // orbital direction: +1 = counter-clockwise, -1 = clockwise
    sign: number;

    // distance from the attractor, updated every frame in updatePosition
    distFromAttractor: number;

    // the minumum distance this particle must keep from the attractor
    // when on a stable orbit
    minDist: number;

    // gravitational attraction strength
    // higher = stronger pull toward attractor
    private static readonly STRENGTH = 10;

    // velocity multiplier applied every frame (0-1). values below 1 simulate drag
    private static readonly DAMPING = 0.99;

    // minimum tangential (orbital) speed
    private static readonly MIN_TANGENTIAL_SPEED = 0.5;

    // base force applied to all particles when the user clicks.
    // higher = stronger impulse
    private static readonly IMPULSE_BASE_FORCE = 700;

    // each particle has a unique orbital radius drawn randomly from [MIN_RAND_DIST, MAX_RAND_DIST]
    //private readonly MIN_DIST = getRandomIntInclusive(
    //Particle.MIN_RAND_DIST, Particle.MAX_RAND_DIST);

    constructor(x: number, y: number, radius: number, attractorX: number, attractorY: number, minDist: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minDist = minDist;
        // pick a random orbital direction
        this.sign = Math.random() > 0.5 ? 1 : -1;

        const dx = attractorX - x;
        const dy = attractorY - y;
        this.distFromAttractor = Math.sqrt(dx * dx + dy * dy);

        // compute the orbital speed needed to maintain a stable orbit at this distance
        const speed = Math.sqrt(Particle.STRENGTH / this.distFromAttractor);

        // the tangential direction is perpendicular to the radial direction
        this.vx = (-dy / this.distFromAttractor) * speed * this.sign;
        this.vy = (dx / this.distFromAttractor) * speed * this.sign;
    }

    /**
     * Updates the particle's velocity and position for the current frame.
     * 
     * @param attractorX X coordinate of the gravitational attractor (mouse position)
     * @param attractorY Y coordinate of the gravitational attractor (mouse position)
     * @param impulseX X coordinate of the click impulse origin (optional)
     * @param impulseY Y coordinate of the click impulse origin (optional)
     */
    updatePosition(attractorX: number, attractorY: number, impulseX?: number, impulseY?: number) {
        const dx = attractorX - this.x;
        const dy = attractorY - this.y;
        this.distFromAttractor = Math.sqrt(dx * dx + dy * dy);

        // revisited gravitational force law.
        // the distance factor is linear and not quadratic.
        const force = this.distFromAttractor > this.minDist
            ? Particle.STRENGTH / this.distFromAttractor
            : -Particle.STRENGTH / (this.distFromAttractor * this.distFromAttractor);

        // acceleration
        const ax = (dx / this.distFromAttractor) * force;
        const ay = (dy / this.distFromAttractor) * force;

        this.vx = (this.vx + ax) * Particle.DAMPING;
        this.vy = (this.vy + ay) * Particle.DAMPING;

        // tangential speed correction:
        // if it falls below MIN_TANGENTIAL_SPEED, it gets boosted to prevent the particle
        // from losing its orbit and spiraling into the attractor
        const tangX = -dy / this.distFromAttractor;
        const tangY = dx / this.distFromAttractor;
        const tangentialSpeed = this.vx * tangX + this.vy * tangY;

        if (Math.abs(tangentialSpeed) < Particle.MIN_TANGENTIAL_SPEED) {
            const boost = (Particle.MIN_TANGENTIAL_SPEED - Math.abs(tangentialSpeed)) * Math.sign(tangentialSpeed || this.sign);
            this.vx += tangX * boost;
            this.vy += tangY * boost;
        }

        // click impulse: apply a radial push away from the click point
        if (impulseX !== undefined && impulseY !== undefined) {
            const idx = this.x - impulseX;
            const idy = this.y - impulseY;
            const idist = Math.sqrt(idx * idx + idy * idy);
            const impulseStrength = Particle.IMPULSE_BASE_FORCE / idist;
            this.vx += (idx / idist) * impulseStrength;
            this.vy += (idy / idist) * impulseStrength;
        }

        // the final position
        this.x += this.vx;
        this.y += this.vy;
    }

    /**
     * Draws this particle in the specified canvas 2D context
     * @param ctx the canvas 2D rendering context
     */
    draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    }
}