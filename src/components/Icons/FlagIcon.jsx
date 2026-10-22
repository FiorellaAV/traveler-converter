import { FlagArg } from './FlagArg';
import { FlagBr } from './FlagBr';
import { FlagCl } from './FlagCl';
import { FlagEu } from './FlagEu';
import { FlagUsa } from './FlagUsa';

const flags = {
    ar: FlagArg,
    br: FlagBr,
    cl: FlagCl,
    eu: FlagEu,
    us: FlagUsa,
};

export const FlagIcon = ({ countryCode, width = 24, height = 24, className }) => {
    const Flag = flags[countryCode];

    if (!Flag) {
        return null;
    }

    return (
        <span className={className} aria-hidden="true">
            <Flag width={width} height={height} />
        </span>
    );
};
