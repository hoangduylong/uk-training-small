import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';

interface IRange {
    old: number;
    new: number;
}

export const InfinityPicker = {
    template: `<div class="ipkr-col">
        <div class="ipkr-viewport"
                v-on:touchstart="gearTouchStart"
                v-on:touchmove="gearTouchMove"
                v-on:touchend="gearTouchEnd">
            <div class="ipkr-wheel">
                <ul class="ipkr-scroll" v-bind:style="{
                    'transform': transform,
                    'margin-top': marginTop
                }">
                    <li class v-for="(item, ik) in items" v-bind:key="ik">{{ (item ? (optionText ? item[optionText] : item) : '') | i18n }}</li>
                </ul>
            </div>
        </div>
    </div>`,
    data: () => ({
        interval: 0,
        time: {
            old: 0,
            new: 0
        },
        range: {
            old: 0,
            new: 0
        },
        position: {
            old: 0,
            new: 0
        }
    }),
    props: ['optionValue', 'optionText', 'value', 'dataSources'],
    computed: {
        $nindex() {
            let self = this,
                select = self.value,
                dataSources = self.dataSources
                    .map((option) => self.optionValue ? option[self.optionValue] : option),
                index = dataSources.indexOf(select),
                mgt = self.$mtNumber,
                move = Math.floor(mgt / 40),
                nidex = move === 0 && index === -1 ? 0 : index + move;

            nidex = Math.floor(nidex % dataSources.length);

            if (dataSources.length < 5) {
                if (nidex < 0) {
                    nidex = 0;
                } else if (nidex > dataSources.length - 1) {
                    nidex = dataSources.length - 1;
                }
            } else {
                nidex = Math.abs(dataSources.length + nidex);
            }

            return Math.floor(nidex % dataSources.length);
        },
        items() {
            let self = this,
                nidex = self.$nindex,
                dataSources = self.dataSources;

            if (dataSources.length >= 5) {
                let items: any[] = [];

                for (let i = nidex - 2; i <= nidex + 2; i++) {
                    if (i < 0) {
                        items.push(dataSources[Math.abs(dataSources.length + i)]);
                    } else if (i > dataSources.length - 1) {
                        items.push(dataSources[Math.abs(dataSources.length - i)]);
                    } else {
                        items.push(dataSources[i]);
                    }
                }

                return items;
            } else {
                if (nidex === 0) {
                    let items: any[] = [undefined, undefined];

                    for (let i = 0; i <= 2; i++) {
                        items.push(dataSources[i]);
                    }

                    return items;
                } else if (nidex === dataSources.length - 1) {
                    let items: any[] = [undefined, undefined];

                    for (let i = nidex; i >= nidex - 2; i--) {
                        items.unshift(dataSources[i]);
                    }

                    return items;
                } else {
                    let items: any[] = [];

                    for (let i = nidex - 2; i <= nidex + 2; i++) {
                        if (i < 0 || i > dataSources.length - 1) {
                            items.push(undefined);
                        } else {
                            items.push(dataSources[i]);
                        }
                    }

                    return items;
                }
            }
        },
        $mtNumber() {
            let self = this,
                rng = self.range,
                mov: number = rng.new - rng.old,
                amo: number = Math.abs(mov),
                mup: boolean = rng.old > rng.new,
                twt: boolean = (amo >= -60 && amo < -20) || (amo <= 60 && amo > 20);

            if (mov >= -20 && mov <= 20) {
                return 0;
            }

            if (mup) {
                if (twt) {
                    return 40;
                } else {
                    return Math.floor(amo / 40) * 40;
                }
            } else {
                if (twt) {
                    return -40;
                } else {
                    return -Math.floor(amo / 40) * 40;
                }
            }
        },
        marginTop() {
            return `${this.$mtNumber - 2}px`;
        },
        transform() {
            let self = this,
                rng = self.range;

            return `translate3d(0px, ${rng.new - rng.old - 80}px, 0px)`;
        }
    },
    methods: {
        gearTouchStart(evt: TouchEvent) {
            let self = this;

            evt.preventDefault();
            evt.stopPropagation();

            clearInterval(self.interval);

            // if continue touch, emit current select item
            if (self.value !== self.dataSources[self.$nindex]) {
                self.emitInput();
            }

            self.time.old = new Date().getTime();
            self.position.old = Math.floor(evt.changedTouches[0].clientY);

            self.range.old = self.range.new = Math.floor(evt.changedTouches[0].clientY);
        },
        gearTouchMove(evt: TouchEvent) {
            let self = this;

            evt.preventDefault();
            evt.stopPropagation();

            self.time.new = new Date().getTime();
            self.range.new = self.position.new = Math.floor(evt.changedTouches[0].clientY);

            if (evt.targetTouches[0].screenY < 1) {
                self.gearTouchEnd(evt);
            }
        },
        gearTouchEnd(evt: TouchEvent) {
            let self = this,
                time = self.time,
                position = self.position;

            evt.preventDefault();
            evt.stopPropagation();

            let gear: number = 0,
                flag = (position.new - position.old) / (time.new - time.old);

            if (Math.abs(flag) < 1) {
                gear = 0;
            } else if (Math.abs(flag) <= 2) {
                gear = 20;
            } else {
                gear = 40;
            }

            if (self.dataSources.length >= 5) {
                self.roleGear(gear);
            } else {
                self.emitInput();
            }
        },
        roleGear(gear: number) {
            let self = this,
                d: number = 0,
                range: IRange = self.range,
                position: IRange = self.position;

            clearInterval(self.interval);

            self.interval = setInterval(() => {
                let rng = range.new - range.old,
                    speed = Math.floor(Math.abs(gear * Math.exp(-0.03 * d)));

                if (gear !== 0) {
                    if (position.new > position.old) {
                        range.new += speed < 1 ? 1 : speed;
                    } else {
                        range.new -= speed < 1 ? 1 : speed;
                    }
                }
                
                if (Math.abs(speed) < 1 && (gear === 0 || Math.abs(rng) % 40 === 0)) {
                    self.emitInput();

                    clearInterval(self.interval);
                }

                d++;
            }, 30);
        },
        emitInput() {
            let self = this,
                index = self.$nindex,
                ov = self.optionValue,
                opt = self.dataSources[index];

            self.$emit('input', ov ? opt[ov] : opt);
        }
    },
    created() {
        let self = this,
            time: IRange = self.time,
            range: IRange = self.range,
            position: IRange = self.position;

        // reset position of gear
        self.$on('input', (value: any) => {
            time.new = 0;
            time.old = 0;

            range.new = 0;
            range.old = 0;

            position.new = 0;
            position.old = 0;
        });
    }
};