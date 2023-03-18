"use strict";
class ClassPerk {
    id;
    type;
    class;
    exclusive;
    unlock;
    modifiers;
    commands;
    constructor(base) {
        this.id = base.id;
        this.type = base.type;
        this.class = base.class;
        this.exclusive = base.exclusive;
        this.unlock = base.unlock;
        this.modifiers = base.modifiers;
        this.commands = base.commands;
    }
    available() {
        if (DEVTOOLS.IGNORE_REQUIREMENTS)
            return true;
        if (player.hasClassPerk(this.id))
            return false;
        if (this.exclusive) {
            for (let perkId of this.exclusive) {
                if (player.hasClassPerk(perkId))
                    return false;
            }
        }
        if (this.unlock.stats) {
            const stats = this.unlock.stats;
            const pStats = player.getStats();
            for (let stat in stats) {
                if (pStats[stat] < stats[stat])
                    return false;
            }
        }
        if (this.unlock.gold) {
            if (player.gold < this.unlock.gold)
                return false;
        }
        console.log("lmao");
        return true;
    }
    assign(options) {
        if (!this.available())
            return;
        hideHover();
        closeConfirmationWindow();
        if (!options?.confirmed) {
            return confirmationWindow(`<f>1.5rem<f>${game.getLocalizedString("confirm_perk_unlock").replace("{id}", game.getLocalizedString(this.id))}`, () => this.assign({ confirmed: true }));
        }
        player.removeGold(this.unlock.gold);
        player.class.perks.push({ ...this });
        if (this.commands) {
            Object.entries(this.commands).forEach(([key, value]) => {
                game.executeCommand(key, value);
            });
        }
        player.restore();
        createClassView();
    }
    tooltip() {
        let tooltip = `<f>1.5rem<f><c>gold<c>${game.getLocalizedString(this.id)}\n`;
        tooltip += "<f>1.2rem<f>";
        if (DEVTOOLS.ENABLED) {
            tooltip += `<c>white<c> [dev] <c>orange<c>${this.id}<c>white<c>\n`;
        }
        // Perk description
        tooltip += `<c>silver<c>"${game.getLocalizedString(this.id + "_desc")}"<c>white<c>\n`;
        if (player.hasClassPerk(this.id)) {
            tooltip += `<c>lime<c>${game.getLocalizedString("class_perk_owned")}<c>white<c>\n`;
        }
        if (this.exclusive) {
            tooltip += `<c>white<c>${game.getLocalizedString("class_perk_exclusive")}:`;
            this.exclusive.forEach((perkId) => {
                const col = player.hasClassPerk(perkId) ? "red" : "goldenrod";
                tooltip += ` <c>${col}<c>${game.getLocalizedString(perkId)}<c>white<c>`;
            });
            tooltip += "\n";
        }
        // Perk unlock
        if (this.unlock.stats) {
            tooltip += `<c>silver<c>Requires:\n`;
            Object.entries(this.unlock.stats).forEach(([key, value]) => {
                const statCol = player.getStats()[key] >= value ? "lime" : "red";
                tooltip += ` <i>${icons[key]}<i>${game.getLocalizedString(key)}: <c>${statCol}<c>${value}<c>white<c>\n`;
            });
        }
        const priceCol = player.gold > this.unlock.gold ? "gold" : "red";
        tooltip += `Price: <c>${priceCol}<c>${compactNumber(this.unlock.gold)}<c>white<c>\n`;
        if (this.commands) {
            Object.entries(this.commands).forEach(([key, value]) => {
                if (key === "add_ability") {
                    const ability = new Ability({ ...value });
                    tooltip += `<f>1.3rem<f>${game.getLocalizedString(key)}:\n`;
                    tooltip += ability.tooltip({ container: true, owner: player });
                    tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
                }
            });
        }
        if (this.modifiers) {
            tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(([key, value]) => {
                tooltip += " " + effectSyntax(key, value);
            });
        }
        return tooltip;
    }
}
const classPerks = {
    warrior: [
        {
            level: 1,
            perks: [
                new ClassPerk({
                    id: "warrior_vitality",
                    type: "classPerk",
                    class: "warrior",
                    unlock: {
                        stats: {
                            str: 15,
                        },
                        gold: 250,
                    },
                    modifiers: {
                        hpMaxFromStrV: 0.5,
                    },
                }),
                new ClassPerk({
                    id: "warrior_power",
                    type: "classPerk",
                    class: "warrior",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        meleeDamageP: 5,
                    },
                }),
                new ClassPerk({
                    id: "warrior_strength",
                    type: "classPerk",
                    class: "warrior",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        strP: 5,
                    },
                }),
                ,
            ],
        },
        {
            level: 5,
            perks: [
                new ClassPerk({
                    id: "warrior_toughness",
                    type: "classPerk",
                    class: "warrior",
                    unlock: {
                        stats: {
                            vit: 20,
                        },
                        gold: 2000,
                    },
                    modifiers: {
                        hpMaxFromStrV: 0.5,
                        vitP: 5,
                    },
                }),
                {
                    exclusive: true,
                    perks: [
                        new ClassPerk({
                            id: "warrior_battle_arts",
                            type: "classPerk",
                            class: "warrior",
                            exclusive: ["warrior_berserking"],
                            unlock: {
                                stats: {
                                    int: 15,
                                    vit: 15,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                spellPowerP: 10,
                                healPowerP: 7.5,
                                intP: 5,
                            },
                        }),
                        new ClassPerk({
                            id: "warrior_berserking",
                            type: "classPerk",
                            class: "warrior",
                            exclusive: ["warrior_battle_arts"],
                            unlock: {
                                stats: {
                                    str: 20,
                                    vit: 15,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                meleeDamageP: 12.5,
                                strP: 10,
                                strV: 5,
                                vitV: 3,
                                intV: -10,
                                spellPowerP: -10,
                                healPowerP: -7.5,
                            },
                        }),
                    ],
                },
            ],
        },
        {
            level: 10,
            perks: [],
        },
        {
            level: 15,
            perks: [],
        },
        {
            level: 20,
            perks: [],
        },
        {
            level: 25,
            perks: [],
        },
        {
            level: 30,
            perks: [],
        },
    ],
    rogue: [
        {
            level: 1,
            perks: [
                new ClassPerk({
                    id: "rogue_make_haste",
                    type: "classPerk",
                    class: "rogue",
                    unlock: {
                        stats: {
                            agi: 15,
                        },
                        gold: 250,
                    },
                    commands: {
                        add_ability: { ...abilities.haste_enchant },
                    },
                }),
                new ClassPerk({
                    id: "rogue_nimble",
                    type: "classPerk",
                    class: "rogue",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        speedP: 5,
                    },
                }),
                new ClassPerk({
                    id: "rogue_agile",
                    type: "classPerk",
                    class: "rogue",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        agiP: 5,
                    },
                }),
            ],
        },
        {
            level: 5,
            perks: [
                new ClassPerk({
                    id: "rogue_critical_strike",
                    type: "classPerk",
                    class: "rogue",
                    unlock: {
                        stats: {
                            agi: 20,
                        },
                        gold: 2000,
                    },
                    modifiers: {
                        critPowerV: 15,
                        critRateV: 5,
                        dodgeV: 2,
                        poisonResistanceV: 10,
                    },
                }),
                {
                    exclusive: true,
                    perks: [
                        new ClassPerk({
                            id: "rogue_bob_and_weave",
                            type: "classPerk",
                            class: "rogue",
                            unlock: {
                                stats: {
                                    agi: 20,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                dodgeV: 10,
                                meleeDamageP: 10,
                                critPowerV: 10,
                                critRateV: 5,
                                hpMaxP: -15,
                            },
                        }),
                        new ClassPerk({
                            id: "rogue_parry_and_riposte",
                            type: "classPerk",
                            class: "rogue",
                            unlock: {
                                stats: {
                                    agi: 20,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                meleeDamageP: 5,
                                physicalDefenceV: 5,
                                critPowerV: 5,
                                critRateV: 2.5,
                            },
                        }),
                    ],
                },
            ],
        },
        {
            level: 10,
            perks: [],
        },
        {
            level: 15,
            perks: [],
        },
        {
            level: 20,
            perks: [],
        },
        {
            level: 25,
            perks: [],
        },
        {
            level: 30,
            perks: [],
        },
    ],
    mage: [
        {
            level: 1,
            perks: [
                new ClassPerk({
                    id: "mage_mana_regen",
                    type: "classPerk",
                    class: "mage",
                    unlock: {
                        stats: {
                            int: 15,
                        },
                        gold: 250,
                    },
                    modifiers: {
                        mpRegenP: 10,
                    },
                }),
                new ClassPerk({
                    id: "mage_spell_mastery",
                    type: "classPerk",
                    class: "mage",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        spellPowerP: 5,
                    },
                }),
                new ClassPerk({
                    id: "mage_books",
                    type: "classPerk",
                    class: "mage",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        intP: 5,
                    },
                }),
            ],
        },
        {
            level: 5,
            perks: [
                new ClassPerk({
                    id: "mage_mana_reserves",
                    type: "classPerk",
                    class: "mage",
                    unlock: {
                        stats: {
                            int: 20,
                        },
                        gold: 2000,
                    },
                    modifiers: {
                        mpMaxFromIntV: 1,
                        mpMaxP: 10,
                        mpRegenP: 10,
                    },
                }),
                {
                    exclusive: true,
                    perks: [
                        new ClassPerk({
                            id: "mage_blast_them",
                            type: "classPerk",
                            class: "mage",
                            exclusive: ["mage_conserve_mana"],
                            unlock: {
                                stats: {
                                    int: 20,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                spellPowerP: 25,
                                healPowerP: 10,
                                magicalDamageP: 5,
                                elementalDamageP: 5,
                                all_mpCostP: 30,
                                all_cooldownV: 1,
                            },
                        }),
                        new ClassPerk({
                            id: "mage_conserve_mana",
                            type: "classPerk",
                            class: "mage",
                            exclusive: ["mage_blast_them"],
                            unlock: {
                                stats: {
                                    int: 20,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                all_mpCostP: -15,
                                all_cooldownP: -10,
                            },
                        }),
                    ],
                },
            ],
        },
        {
            level: 10,
            perks: [],
        },
        {
            level: 15,
            perks: [],
        },
        {
            level: 20,
            perks: [],
        },
        {
            level: 25,
            perks: [],
        },
        {
            level: 30,
            perks: [],
        },
    ],
    paladin: [
        {
            level: 1,
            perks: [
                new ClassPerk({
                    id: "paladin_smite",
                    type: "classPerk",
                    class: "paladin",
                    unlock: {
                        stats: {
                            spi: 15,
                        },
                        gold: 250,
                    },
                    commands: {
                        add_ability: { ...abilities.smite },
                    },
                }),
                new ClassPerk({
                    id: "paladin_vigour",
                    type: "classPerk",
                    class: "paladin",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        hpMaxP: 3,
                        hpMaxV: 10,
                    },
                }),
                new ClassPerk({
                    id: "paladin_strength",
                    type: "classPerk",
                    class: "paladin",
                    unlock: {
                        gold: 100,
                    },
                    modifiers: {
                        strP: 5,
                    },
                }),
            ],
        },
        {
            level: 5,
            perks: [
                new ClassPerk({
                    id: "paladin_blessing",
                    type: "classPerk",
                    class: "paladin",
                    unlock: {
                        stats: {
                            spi: 15,
                            vit: 15,
                        },
                        gold: 2000,
                    },
                    modifiers: {
                        healPowerP: 15,
                        vitP: 7.5,
                    },
                }),
                {
                    exclusive: true,
                    perks: [
                        new ClassPerk({
                            id: "paladin_divine_dedication",
                            type: "classPerk",
                            class: "paladin",
                            exclusive: ["paladin_sword_and_shield"],
                            unlock: {
                                stats: {
                                    spi: 20,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                spellPowerP: 12.5,
                                mpMaxP: 5,
                                healPowerP: 2.5,
                                spiV: 2,
                                intV: 2,
                                hpMaxP: -5,
                            },
                        }),
                        new ClassPerk({
                            id: "paladin_sword_and_shield",
                            type: "classPerk",
                            class: "paladin",
                            exclusive: ["paladin_divine_dedication"],
                            unlock: {
                                stats: {
                                    str: 15,
                                    vit: 20,
                                },
                                gold: 1500,
                            },
                            modifiers: {
                                meleeDamageP: 10,
                                hpMaxP: 5,
                                strV: 2,
                                vitV: 2,
                                spellPowerP: -5,
                                mpMaxP: -5,
                            },
                        }),
                    ],
                },
            ],
        },
        {
            level: 10,
            perks: [],
        },
        {
            level: 15,
            perks: [],
        },
        {
            level: 20,
            perks: [],
        },
        {
            level: 25,
            perks: [],
        },
        {
            level: 30,
            perks: [],
        },
    ],
};
//# sourceMappingURL=class_perk.js.map