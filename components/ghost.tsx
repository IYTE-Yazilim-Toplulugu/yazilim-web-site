// components/Ghost.tsx
import './ghost.css';

export default function Ghost() {
    return (
        <div id="ghost">
            <div id="red">
                <div id="pupil"></div>
                <div id="pupil1"></div>
                <div id="eye"></div>
                <div id="eye1"></div>
                <div id="top0"></div>
                <div id="top1"></div>
                <div id="top2"></div>
                <div id="top3"></div>
                <div id="top4"></div>
                <div id="st0"></div>
                <div id="st1"></div>
                <div id="st2"></div>
                <div id="st3"></div>
                <div id="st4"></div>
                <div id="st5"></div>
                {[...Array(18)].map((_, i) => (
                    <div key={i} id={`an${i + 1}`}></div>
                ))}
            </div>
            <div id="shadow"></div>
        </div>
    );
}
