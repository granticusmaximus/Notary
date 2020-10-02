/* eslint-disable */
//import * as jQuery from 'jquery';
//import { awef } from './awef.js';
//import { awe } from './awe.js';
//import { awem } from './awem.js';
//import { awedict } from './awedict.js';

var aweui = function ($) {
    var nul = null, loop = awef.loop, isNull = awef.isNull, isNotNull = awef.isNotNull;
    var disbattr = 'disabled="disabled"';

    function dict() {
        return aweui.dict;
    }

    function addDomDestrf(o, field, input) {
        awe.addDestr(o,
            function () {
                field.before(input);
                field.remove();
            },
            'dom');
    }

    function toData(ps) {
        var keys = [];
        var vals = [];
        var ls = [];
        if (ps) {
            for (var i = 0; i < ps.length; i++) {
                var el = ps[i];
                keys.push(el.name);
                vals.push(el.id);
                ls.push(isNotNull(el.load) ? el.load : 1);
            }
        }

        return { keys: keys, vals: vals, l: ls };
    }

    function toPars(ps) {
        var keys = [];
        var vals = [];
        if (ps) {
            for (var i = 0; i < ps.length; i++) {
                var el = ps[i];
                keys.push(el.name);
                vals.push(el.val);
            }
        }

        return { keys: keys, vals: vals };
    }

    function toBtns(btns) {
        var res = [];
        loop(btns, function (el) {
            el.sf = el.action;
            res.push(el);
        });

        return res;
    }

    function renderInput(opt) {
        var res = '<input type="' + opt.type + '" id="' + opt.id + '" ';
        if (isNotNull(opt.attr)) res += opt.attr;
        res += '/>';
        return res;
    }

    function renderButton(opt) {
        opt.attr = ifnul(opt.attr, (opt.dsb ? disbattr : ''));

        return '<button type="button" ' + opt.attr + ' class="awe-btn ' + opt.cls + '">' + (opt.cont || '') + '</button>';
    }

    function renderField(input, eo, id, o) {
        input.addClass('awe-val');

        if (eo.multi) {
            input.addClass('awe-array');
            input.attr('disabled', 'disabled');
        }

        var dispstr = eo.dispf ? eo.dispf(id) : '<div class="awe-display"></div>';

        var fclss = 'awe-' + eo.fieldcls + '-field awe-field';
        if (o.enb === false) fclss += ' awe-disabled';

        var field = $('<div class="' + fclss + '">' + dispstr + '</div>');
        input.after(field);
        field.prepend(input);
        return field;
    }

    function editor(rcfg) {
        return function (o) {
            var tag = {};
            var id = o.id;
            var input = getElm(o);
            var name = input.attr('name') || o.name || id;

            var field = renderField(input, rcfg, id, o);

            var mo = { tag: tag };
            rcfg.modf && rcfg.modf(mo);

            var cfg = {
                orig: o,
                type: rcfg.type,
                i: id,
                elm: o.elm,
                nm: name,
                url: o.url,
                df: o.dataFunc,
                l: isNull(o.load) ? true : o.load,
                data: toData(o.parents),
                pars: toPars(o.parameters),
                parf: o.parameterFunc,
                enb: o.enb,
                md: mo.mod,
                tag: mo.tag
            };

            setPar(cfg, o);

            rcfg.func(cfg);

            addDomDestrf(cfg, field, input);
        }
    }

    function getElm(o) {
        return o.elm && $(o.elm) || $('#' + o.id);
    }

    function setPar(cfg, o) {
        cfg.data = toData(o.parents);
        cfg.pars = toPars(o.parameters);
        cfg.parf = o.parameterFunc;
        return cfg;
    }

    function mapHeaderGroups(o) {
        var res = [];
        loop(o.headerGroups, function (n) {
            res.push({
                L: n.level,
                C: n.content,
                Cc: n.cssClass
            });
        });

        return res;
    }

    function mapNests(o) {
        var res = [];
        loop(o.nests, function (n) {
            res.push({
                C: n.name,
                F: n.setCont,
                U: n.url,
                L: n.loadOnce,
                T: ifnul(n.toggle, true),
                S: n.single
            });
        });

        return res;
    }

    function mapColumns(o) {
        var ucols = o.columns;
        var cols = [];

        function getMinWidth(c1) {
            if (isNotNull(c1.minWidth)) {
                return c1.width > 0 ? math.min(c1.width, c1.minWidth) : c1.minWidth;
            }

            return c1.width > 0 ? c1.width : 140;
        }

        loop(ucols, function (c) {
            var mod = c.mod || {};
            mod.inline = c.inline;
            mod.inlinef = c.inlinef;

            var col = {
                I: c.id,
                P: c.bind,
                H: c.header || c.bind || '',
                T: c.clientFormat,
                Ft: c.footerClientFormat,
                F: c.clientFormatFunc,
                G: c.groupable,
                S: c.sortable,
                W: c.width,
                Gd: c.group,
                So: c.sortRank,
                Gk: c.groupRank,
                Gr: ifnul(c.groupRemovable, true),
                Sort: c.sort || 0,
                O: c.order,
                Mw: getMinWidth(c),
                R: c.resizable,
                Re: c.reorderable,
                Hid: c.hidden,
                Cc: c.cssClass,
                Hcc: c.headerCssClass,
                tag: mod,
                Hg: c.headerGroupsIndx
            };

            cols.push(col);
        });

        return cols;
    }

    function ifnul(val, dval) {
        return isNull(val) ? dval : val;
    }

    function getPopupPrm(o, id, dflt) {
        dflt = dflt || {};
        var width = ifnul(dflt.w, 700);
        var height = ifnul(dflt.h, 330);
        var wws = 0;
        var hws = 0;

        if (isNotNull(o.width)) {
            width = o.width;
            wws = 1;
        }

        if (isNotNull(o.height)) {
            height = o.height;
            hws = 1;
        }

        var prms = {
            f: o.fullscreen,
            i: id,
            g: o.group,
            t: o.title,
            w: width,
            wws: wws,
            mw: o.maxWidth || 0,
            h: height,
            hws: hws,
            m: o.modal,
            pc: o.popupClass,
            dntr: o.loadOnce,
            top: o.top,
            cl: o.close
        };

        return prms;
    }

    function initPopup(o, opt) {
        var id = o.id;
        var tag = {};

        tag.Dd = o.dropdown;
        tag.Occ = o.outClickClose;
        tag.Sh = o.showHeader;
        tag.Tg = o.toggle;
        tag.Inline = o.inline;

        var cfg = {
            orig: o,
            i: id,
            type: opt.type,
            u: o.url,
            setCont: o.setCont,
            dataFunc: o.dataFunc,
            postFunc: o.postFunc,
            c: o.content,
            data: toData(o.parents),
            pars: toPars(o.parameters),
            parf: o.parameterFunc,
            b: toBtns(o.btns),
            ol: o.onLoad,
            tags: '',
            lo: o.loadOnce,
            p: getPopupPrm(o, id),
            tag: tag
        };

        opt.modCfg && opt.modCfg(cfg);

        awe.ip(cfg);
    }

    function initLookup(o, multi) {
        var type = 'lookup';
        var mod = nul;
        if (multi) type = 'multi' + type;

        var tag = {};
        var id = o.id;
        var input = getElm(o);
        var name = input.attr('name') || o.name || id;
        var enabled = o.enb !== false;
        var clearBtnStr = '';
        var openBtnStr = renderButton({ cls: 'awe-openbtn', dsb: !enabled, cont: '...' });

        if (o.clearButton) {
            clearBtnStr = renderButton({ cls: 'awe-clearbtn', dsb: !enabled, cont: '<span class="awe-icon awe-icon-x"></span>' });
        }

        input.data('name', name);

        input.addClass('awe-multilookup');

        var field = renderField(input,
            {
                multi: multi,
                fieldcls: type,
                dispf: function () {
                    if (multi) {
                        return '<div style="display:none;"></div><ul class="awe-display"><li>&nbsp;</li></ul>' + openBtnStr + clearBtnStr;
                    }

                    return '<div class="awe-display"><div class="awe-caption">&nbsp;</div></div>' + openBtnStr + clearBtnStr;
                }
            }, id, o);

        var gmod = o.lookupGrid;
        var popUrl = o.popupUrl;
        var setCont = null;
        if (isNotNull(gmod)) {
            mod = awem.lookupGrid;
            popUrl = gmod.url;
            setCont = gmod.setCont;
        }

        gmod = o.multilookupGrid;
        if (isNotNull(gmod)) {
            mod = awem.multilookupGrid;
            popUrl = gmod.url;
            setCont = gmod.setCont;
        }

        var w = ifnul(o.width, 0);
        var h = ifnul(o.heigth, multi ? 500 : 400);

        o.loadOnce = true;

        var cfg = {
            type: type,
            p: getPopupPrm(o, id + '-awepw', { w: w, h: h }),
            i: id,
            nm: name,
            getMultipleUrl: o.getUrl,
            getUrl: o.getUrl,
            searchUrl: o.searchUrl,
            selectedUrl: o.selectedUrl,
            dg: ifnul(o.dragAndDrop, true),
            ok: dict().Ok,
            cancel: dict().Cancel,
            st: dict().Search,
            stp: dict().Search,
            mt: dict().More,
            sf: o.sformUrl,
            pu: popUrl,
            sc: ifnul(o.searchOnChange, 1),
            hi: o.highlightChange,
            enb: enabled,
            md: mod,
            tag: tag,
            dataFunc: o.dataFunc,
            setCont: setCont
        };

        setPar(cfg, o);

        if (multi) {
            awe.multilookup(cfg);
        } else {
             awe.lookup(cfg);
        }

        addDomDestrf(cfg, field, input);
    }

    function createTag(name, attr) {
        var res = '<' + name;

        for (var nm in attr) {
            var val = attr[nm];
            if (isNotNull(val) && val !== '') {
                res += ' ' + nm + '="' + val + '"';
            }
        }

        res += '/>';

        return res;
    }

    return {
        btn: renderButton,
        flash: awe.flash,
        init: function () {
            if (awedict) {
                aweui.dict = awem.clientDict = awedict;
            }
            awem.aweui = aweui;
        },
        getErrors: function (errs) {
            return { _errs: errs };
        },
        inlRes: function (o) {
            return { Item: o };
        },
        listRes: function (o) {
            return {
                d: {
                    it: o.items,
                    m: o.more,
                    p: o.pivot,
                    c: o.content
                }
            };
        },
        selectionType: function () {
            return {
                single: 1,
                multiple: 2,
                multicheck: 3
            };
        }(),
        grid: function (o) {
            o.origf = aweui.grid;
            var orig = o;
            var contentStr =
                '<table class="awe-table"><colgroup></colgroup><tbody class="awe-tbody awe-itc"></tbody></table>';

            var mods = [];
            var props = {};
            var id = o.id;
            var cont = getElm(o);
            cont.addClass('awe-grid');
            if (o.cssClass) cont.addClass(o.cssClass);

            var selectionType = 0;
            var filterSelector = '';

            var selectable = o.selectable;

            if (selectable) {
                selectionType = ifnul(selectable.type, aweui.selectionType.multicheck);
                filterSelector = ifnul(selectable.filterSelector, '');
            }

            var defl = { sortable: true, resizable: true, groupable: true };

            o = $.extend(defl, o);

            var om = o.mod;
            if (om) {
                if (om.pageSize) mods.push(awem.gridPageSize);
                if (om.columnsSelector) mods.push(awem.gridColSel);
                if (om.pageInfo) mods.push(awem.gridPageInfo);
                if (om.infiniteScroll) mods.push(awem.gridInfScroll);
                if (om.keyNav) mods.push(awem.gridKeyNav);

                if (om.autoMiniPager) {
                    mods.push(awem.gridAutoMiniPager);
                }
                else if (om.miniPager) {
                    mods.push(awem.gridMiniPager);
                }

                var inl = om.inlineEdit;
                if (inl) {
                    mods.push(awem.gridInlineEdit(
                        inl.createUrl,
                        inl.editUrl,
                        inl.oneRow,
                        inl.reloadOnSave,
                        inl.rowClickEdit,
                        inl.dataFunc,
                        inl.initRow));
                }

                var ldng = om.loading;
                if (ldng) {
                    mods.push(awem.gldng(ldng.ldngDisb, ldng.noEmpMsg));
                    props["empMsg"] = ldng.emptyMessage || dict().NoRecFound;
                }

                var mvrows = om.movableRows;
                if (mvrows) {
                    mvrows.G = mvrows.dropOn;
                    mods.push(awem.gridMovRows(mvrows));
                }

                if (om.customRender) {
                    var cropt = { mdf: om.customRender };
                    contentStr = '<div class="awe-itc"></div>';
                    mods.push(awem.gridCstRen(cropt));
                }

                if (om.custom) {
                    mods = mods.concat(om.custom);
                }
            }

            var autohide = false;
            var isGroupColPres = false;
            loop(o.columns,
                function (col) {
                    var cmod = col.mod;
                    if (om && om.columnsAutohide) {
                        autohide = true;
                        if (isNull(cmod)) {
                            cmod = col.mod = {};
                        }

                        if (isNull(cmod.autohide)) {
                            cmod.autohide = true;
                        }

                        if (cmod.nohide) {
                            cmod.autohide = false;
                        }
                    }
                    else if (cmod && cmod.autohide) {
                        autohide = true;
                    }

                    col.groupable = ifnul(col.groupable, o.groupable);
                    col.sortable = ifnul(col.sortable, o.sortable);
                    col.resizable = ifnul(col.resizable, o.resizable);
                    col.reorderable = ifnul(col.reorderable, o.reorderable);

                    if (!col.bind) {
                        col.sortable = col.groupable = false;
                    }

                    if (col.groupable) isGroupColPres = true;
                });

            if (autohide) {
                mods.push(awem.gridColAutohide);
            }

            var groupBar = ifnul(o.showGroupBar, isGroupColPres) ? '<div class="awe-groupbar"></div>' : '';

            var footer = ifnul(o.showFooter, true)
                ? '<div class="awe-footer"><div class="awe-relbox"><button type="button" class="awe-btn awe-reload"><span class="awe-reload-ico"></span></button>' +
                '<span class="awe-gblc"></span></div><div class="awe-pager"></div></div>'
                : '';

            var thead = ifnul(o.showHeader, true)
                ? '<div class="awe-header"><div class="awe-hcon"><div class="awe-colw"><table><colgroup></colgroup><tbody class="awe-hrow"></tbody></table></div></div></div>'
                : '';

            var fzContent = '<div class="awe-gfc"><div class="awe-tablc"><div class="awe-tablw">' + contentStr + '</div></div></div>';

            var mainContent =
                '<div class="awe-content awe-tablc"><div class="awe-tablw">' + contentStr + '</div></div>';

            var gridContent = '<div class="awe-mcontent">' + fzContent + mainContent + '</div>';

            var reh =
                '<div class="awe-reh" style="display:none;"><span class="awe-spindown-ico"></span><span class="awe-spinup-ico"></span></div>';

            var scont = groupBar + thead + gridContent + footer + reh;

            cont.html(scont);

            // set header group indexes
            loop(o.columns, function (col) {
                var groupix = [];
                var haslvl0 = false;
                loop(col.headerGroups, function (hgid) {
                    // get index
                    loop(o.headerGroups,
                        function (hg, i) {
                            if (hg.id === hgid) {
                                groupix.push(i);
                                if (hg.level === 0) haslvl0 = true;
                            }
                        });
                });

                if (groupix.length && !haslvl0) {
                    awe.lerr('columns with headerGroups must have at least one group with level = 0 grid:' + id + ' col:' + col.bind);
                }

                col.headerGroupsIndx = groupix;
            });

            var cfg = {
                orig: orig,
                i: id,
                url: o.url,
                df: o.dataFunc,
                columns: mapColumns(o),
                nsts: mapNests(o),
                hg: mapHeaderGroups(o),
                s: o.singleColumnSort,
                sh: ifnul(o.showHeader, true),
                sgc: ifnul(o.showGroupedColumn, true),
                gbt: dict().GridGroupBar,
                h: o.height,
                mh: o.minHeight,
                pk: o.persistenceKey,
                prs: o.persistence,
                cps: o.columnsPersistence,
                cohc: ifnul(o.collapseOnHeaderClick, true),
                p1: o.page1OnSort,
                rcf: o.rowClassClientFormat,
                lpc: ifnul(o.loadOnParentChange, true),
                l: ifnul(o.load, true),
                cw: o.columnWidth || 140,
                st: selectionType,
                fs: filterSelector,
                ps: o.pageSize || 10,
                sc: o.sendColumns,
                enc: ifnul(o.encode, true),
                md: mods,
                props: props
            };

            setPar(cfg, o);

            awe.grid(cfg);

            awe.addDestr(cfg,
                function () {
                    awe.destroyCont(cont);
                    cont.empty().removeClass('awe-grid');
                },
                'dom');
        },
        list: function (o) {
            o.origf = aweui.grid;
            var id = o.id;
            var cont = getElm(o);
            cont.addClass('awe-ajaxlist awe-srl');

            awe.ajaxList(setPar({
                orig: o,
                i: id,
                type: 'ajaxList',
                searchUrl: o.url,
                mt: o.moreText || dict().More,
                lpc: o.loadOnParentChange
            }, o));
        },
        readonly: function (o) {
            var input = getElm(o);
            input.after(input.val());
        },
        txt: function (o) {
            o.origf = aweui.txt;
            var id = o.id;
            var input = getElm(o);
            var enabled = o.enb !== false;

            var numeric = o.numeric;
            var isNumeric = !!numeric;
            if (numeric === true) numeric = {};

            var showSpinners = false;

            if (numeric) {
                if (isNull(numeric.min) && !numeric.allowNegative) {
                    numeric.min = 0;
                }

                showSpinners = ifnul(numeric.showSpinners, true);
            }

            input.addClass('awe-txt awe-val');

            var editorAttr = {
                type: 'text',
                size: 1,
                id: id + '-awed',
                placeholder: o.placeholder,
                maxlength: o.maxlength,
                "class": 'awe-display awe-txt' + (showSpinners ? ' awe-hasSpinners' : ''),
                disabled: enabled ? nul : 'disabled',
                autocomplete: isNumeric ? 'off' : nul,
                readonly: o.readonlyInput ? 'readonly' : nul
            };

            var spinners = '';
            function spinbtn(dir) {
                return renderButton({
                    cont: '<span class="awe-spin' + dir + '-ico"></span>',
                    cls: 'awe-spinbtn awe-spin' + dir,
                    attr: 'tabindex="-1" ' + (enabled ? '' : disbattr)
                });
            }

            if (showSpinners) {
                spinners = '<div class="awe-spincont">' +
                    spinbtn('up') +
                    spinbtn('down') +
                    '</div>';
            }

            var dispInp = createTag('input', editorAttr);

            var field = $('<div class="awe-txt-field awe-field">' + dispInp + spinners + '</div>');
            input.after(field);
            field.prepend(input);

            var cfg = {
                orig: o,
                i: id,
                num: isNumeric,
                ss: showSpinners,
                sep: aweui.decimalSep,
                enb: enabled,
                ff: o.formatFunc
            };

            if (isNumeric) {
                cfg.stp = ifnul(numeric.step, 1);
                cfg.dec = numeric.decimals;
                cfg.max = numeric.max;
                cfg.min = numeric.min;
            }

            awe.txt(cfg);

            addDomDestrf(cfg, field, input);
        },
        autocomplete: function (o) {
            o.origf = aweui.atuocomplete;
            var id = o.id;
            var input = getElm(o);
            var enabled = o.enb !== false;
            var placeh = o.placeholder;

            input.addClass('awe-txt awe-autocomplete awe-val');
            if (!enabled) input.attr('disabled', 'disabled');
            if (placeh) input.attr('placeholder', placeh);

            awe.autocomplete(setPar({
                orig: o,
                i: id,
                u: o.url,
                df: o.dataFunc,
                itemFunc: o.itemFunc,
                c: o.cache,
                ck: o.cacheKey,
                ml: o.minLength,
                dl: o.delay,
                af: o.autofocus,
                enb: enabled,
                num: o.numeric
            }, o));

        },
        datepicker: function (o) {
            o.origf = aweui.datepicker;
            var id = o.id;
            var inline = o.inline;
            var input = getElm(o);
            var enabled = o.enb !== false;
            var disbStr = enabled ? '' : disbattr;
            var clearbtn = o.clearButton ? renderButton({ attr: disbStr, cls: 'awe-clearbtn', cont: '<span class="awe-icon awe-icon-x"></span>' }) : '';
            var openbtn = renderButton({ cls: 'awe-dpbtn', attr: disbStr, cont: '<span class="awe-icon awe-icon-datepicker"></span>' });


            input.addClass('awe-val awe-txt awe-display');
            input.attr("size", 1);

            if (!enabled) input.attr('disabled', 'disabled');
            var midstr = openbtn + clearbtn;

            var clss = '';

            if (inline) {
                midstr = "<div class='awe-ilc'></div>";
                clss = 'awe-inl';
            }

            var field = $('<div class="awe-datepicker-field awe-field ' + clss + '">' + midstr + '</div>');
            input.after(field);
            field.prepend(input);

            o.p = { ilc: inline, changeMonth: true, changeYear: true };
            $.extend(o.p, o);

            o.i = id;
            o.elm = input;
            o.enb = enabled;

            o.orig = o;

            awe.dtp(o);

            addDomDestrf(o, field, input);
        },
        chk: function (o) {
            o.origf = aweui.chk;
            var mod = null;
            var id = o.id;
            var input = getElm(o);
            var simpChkOpt = { id: id + '-awed', type: 'checkbox' };
            var enabled = o.enb !== false;

            simpChkOpt.attr = !enabled ? disbattr : '';

            if (o.ochk) {
                mod = awem.ochk;

                simpChkOpt.attr += ' style="display:none;"';

                o.renderDisp = function () {
                    var tabAttr = 'tabindex="0"';
                    var chkedcls = input.val() && input.val() === 'true' ? 'o-chked' : '';

                    if (!enabled) {
                        tabAttr = '';
                    }

                    var str = '<div class="o-chk ' + chkedcls + '"><div class="o-chkc"><div ' + tabAttr + ' class="o-chkico"></div></div></div>'
                        + renderInput(simpChkOpt);
                    return str;
                };
            }
            else if (o.otoggl) {
                mod = awem.otggl;
                var tcfg = o.otoggl;
                simpChkOpt.attr += ' style="display:none;"';

                o.renderDisp = function () {
                    var tabAttr = 'tabindex="0"';
                    var chkedcls = input.val() && input.val() === 'true' ? 'o-chked' : '';
                    var yes = tcfg.yes || dict().Yes, no = tcfg.no || dict().No;

                    if (!enabled) {
                        tabAttr = '';
                    }



                    var style = ' style="width:' + tcfg.width + ';"';

                    var str =
                        '<div ' + tabAttr + style + ' class="o-tg ' + chkedcls + '">' +
                        '<div class="o-tgg">' +
                        '<div class="o-tgon"><span class="o-ccon">' + yes + '</span></div>' +
                        '<div class="o-tgoff"><span class="o-ccon">' + no + '</span></div>' +
                        '<div class="o-tgh awe-btn o-btn"></div>' +
                        '</div>' +
                        '</div>' +
                        renderInput(simpChkOpt);
                    return str;
                };
            }

            var disp = isNotNull(o.renderDisp) ?
                o.renderDisp(o) :
                renderInput(simpChkOpt);

            input.addClass('awe-val awe-chk');

            var fclss = 'awe-chk-field awe-field';
            if (!enabled) {
                fclss += ' awe-disabled';
            }

            var field = $('<div class="' + fclss + '"><div class="awe-display">' + disp + '</div></div>');
            input.after(field);
            field.prepend(input);

            var cfg = {
                orig: o,
                i: o.id,
                enb: enabled,
                efv: o.emptyFalseVal,
                md: mod
            };

            awe.chk(cfg);

            addDomDestrf(cfg, field, input);
        },
        checkboxList: function (o) {
            o.origf = aweui.checkboxList;
            var cfg = {
                type: 'checkboxList',
                func: awe.checkboxList,
                fieldcls: 'ajaxcheckboxlist',
                multi: true,
                modf: function (mo) {
                    if (o.ochk) {
                        mo.mod = awem.ochkl;
                    }

                    if (o.multiselect) {
                        mo.mod = awem.multiselect;
                        mo.tag.reorderable = true;
                        mo.tag = $.extend(mo.tag, o.multiselect);
                    }
                }
            };

            return editor(cfg)(o);
        },
        radioList: function (o) {
            o.origf = aweui.radioList;
            var cfg = {
                type: 'radioList',
                func: awe.radioList,
                fieldcls: 'ajaxradiolist',
                modf: function (mo) {
                    var tag = null;

                    if (o.ochk) {
                        mo.mod = awem.ochkl;
                    }
                    else if (o.odropdown) {
                        mo.mod = awem.odropdown;
                        tag = o.odropdown;
                    }
                    else if (o.combobox) {
                        mo.mod = awem.combobox;
                        tag = o.combobox;
                    }
                    else if (o.buttongroup) {
                        mo.mod = awem.btnGroup;
                        tag = o.buttongroup;
                    }
                    else if (o.menuDropdown) {
                        mo.mod = awem.menuDropdown;
                        tag = o.menuDropdown;
                    }

                    if (tag) {
                        var autos = tag.autoSearch;

                        if (isNotNull(autos)) {
                            if (autos === false) {
                                autos = -1;
                            } else if (autos === true) {
                                autos = 0;
                            }

                            tag.asmi = autos;
                        }

                        mo.tag = tag;
                    }
                }
            };

            return editor(cfg)(o);
        },
        add: function (o) {
            var cfg = {
                type: 'add',
                func: awe.add,
                fieldcls: 'ajaxdropdown',
                dispf: function (id) { return '<select id="' + id + '-awed" class="awe-display">'; }
            };

            return editor(cfg)(o);
        },
        initPopupForm: function (o) {
            o.origf = aweui.initPopupForm;
            initPopup(o,
                {
                    type: 'pf',
                    modCfg: function (cfg) {
                        $.extend(cfg,
                            {
                                rs: o.refreshOnSuccess,
                                ot: ifnul(o.okText, dict().Ok),
                                ct: ifnul(o.cancelText, dict().Cancel),
                                sf: o.success,
                                cs: ifnul(o.closeOnSuccess, true),
                                udb: ifnul(o.useDefaultButtons, true),
                                ufd: o.useFormData
                            });
                    }
                });
        },
        initPopup: function (o) {
            o.origf = aweui.initPopup;
            initPopup(o, { type: 'op' });
        },
        open: awe.open,
        lookup: function (o) {
            initLookup(o);
        },
        multilookup: function (o) {
            initLookup(o, true);
        },
        rebuildAll: function () {
            function rebuild(o) {
                if (o && o.orig) {
                    awe.destroy(o);
                    o.orig.origf(o.orig);
                }
            }

            // popups
            for (var key in awe.storage) {
                var so = awe.storage[key];
                rebuild(so);
            };

            $('body').find('.awe-grid,.awe-val').each(function () {
                rebuild($(this).data('o'));
            });
        },
        decimalSep: '.',
        version: '6.3.20'
    };
}(jQuery);

//export { aweui };