mw.loader.implement("ext.gadget.refTooltip@0dgpv2z", function ($, jQuery, require, module) {
    'use strict';
    $(function () {
        var i18n = {
            cancelButton: 'Cancel',
            doneButton: 'Done',
            enableLabel: 'Enable reference tooltips',
            optionsButtonTitle: 'Change reference tooltip options',
            referencesSectionName: 'References',
            saveFailedStorageFull: "Is your browser's localStorage full?",
            saveFailedTitle: 'Saving options failed'
        };
        var $win = $(window);
        var $body = $('.mw-body');
        var $content = $('#mw-content-text');
        var $tooltip = $();
        var $tooltipText = $();
        var tooltipRect, tooltipInnerWidth, tooltipOffset, $anchor, anchorRect;
        var showTimer, hideTimer;
        var loggedIn = !!mw.config.get('wgUserId');
        var options = {
            enabled: !0
        };
        if (!loggedIn) {
            try {
                options = JSON.parse(localStorage.refTooltip);
            } catch (e) {}
        }
        var createTooltip = function ($anchor, content, showOptions) {
            $tooltip.remove();
            $tooltip = $('<div>').addClass('ref-tooltip').data({
                anchor: $anchor,
                fresh: !0,
            }).on('mouseenter mouseleave', function (e) {
                $anchor[e.type]();
            });
            $tooltipText = $('<div>').addClass(
                'ref-tooltip-text').append(content).appendTo($tooltip);
            if (showOptions) {
                $tooltipText.prepend($('<button>').addClass('pixel-image ref-tooltip-options-button').attr('title', i18n.optionsButtonTitle));
            }
            $('<div>').addClass('ref-tooltip-arrow').appendTo($tooltip);
            $tooltip.appendTo('body');
            $tooltipText.width($tooltipText.width() + 1);
            setPos(true);
            setTimeout(function () {
                $tooltip.removeData('fresh');
            }, 0);
        };
        var removeTooltip = function () {
            $tooltip.trigger('refTooltip-close');
            $tooltip.remove();
            $tooltip = $();
        };
        var getRefText = function ($ref) {
            var refId = $ref.find('a').attr('href').split('#')[1];
            var $refText = $(document.getElementById(refId)).clone();
            $refText.find('.mw-cite-backlink').remove();
            return $refText.html();
        };
        var setPos = function (initial) {
            if (!$tooltip.length) {
                return;
            }
            if (initial) {
                tooltipRect = $tooltipText[0].getBoundingClientRect();
                tooltipInnerWidth = $tooltipText.width();
                tooltipOffset = {
                    top: parseFloat($tooltipText.css('margin-top')),
                    left: parseFloat($tooltipText.css('margin-left'))
                };
                $anchor = $tooltip.data(
                    'anchor');
                anchorRect = $anchor[0].getBoundingClientRect();
            } else {
                $tooltip.removeClass('ref-tooltip-flipped');
                $tooltipText.css('margin-left', '');
            }
            var tooltipPos = {
                top: $win.scrollTop(),
                left: $win.scrollLeft()
            };
            if (anchorRect.top + tooltipOffset.top < tooltipRect.height) {
                $tooltip.addClass('ref-tooltip-flipped');
                tooltipPos.top += anchorRect.bottom;
            } else {
                tooltipPos.top += anchorRect.top - tooltipRect.height;
            }
            tooltipPos.left += anchorRect.left + anchorRect.width / 2;
            var contentPadding = parseFloat($body.css('padding-right'));
            var contentBoundary = $body[0].getBoundingClientRect().right - contentPadding / 2;
            var overlap = anchorRect.left + tooltipOffset.left + tooltipRect.width - contentBoundary;
            if (overlap > 0) {
                $tooltipText.css('margin-left', Math.max(tooltipOffset.left - overlap, -tooltipInnerWidth));
            }
            $tooltip.css(tooltipPos);
        };
        var bindRefHandlers = function () {
            $content.on({
                'mouseenter.refTooltip': function () {
                    var $this = $(this);
                    clearTimeout(hideTimer);
                    if ($tooltip.length && ($this.is($tooltip.data('anchor')) || $.contains($tooltip[0], this))) {
                        return;
                    }
                    showTimer = setTimeout(function () {
                        createTooltip($this, getRefText($this), true);
                    }, 200);
                },
                'mouseleave.refTooltip': function () {
                    clearTimeout(showTimer);
                    hideTimer = setTimeout(function () {
                        removeTooltip();
                    }, 300);
                }
            }, '.reference');
        };
        $(window).on('click.refTooltip', function (e) {
            if ($tooltip.length && !$tooltip.data('fresh') && !$.contains($tooltip[0], e.target)) {
                clearTimeout(showTimer);
                removeTooltip();
            }
        });
        $(document.getElementById(mw.util.escapeIdForAttribute(i18n.referencesSectionName))).before($('<button>').addClass('pixel-image ref-tooltip-options-button').attr('title', i18n.optionsButtonTitle));
        $('body').on('click.refTooltip', '.ref-tooltip-options-button', function (e) {
            if ($tooltip.length && $tooltip.data('anchor').is(e.target)) {
                return;
            }
            $content.off('mouseenter.refTooltip mouseleave.refTooltip');
            $tooltip.on('refTooltip-close', function () {
                if (options.enabled) {
                    bindRefHandlers();
                }
            });
            var $anchor = $(this);
            $anchor.addClass('ref-tooltip-loading');
            if ($tooltip.length && $.contains($tooltip[0], $anchor[0])) {
                $anchor =
                    $tooltip.data('anchor');
            }
            mw.loader.using(['mediawiki.api', 'mediawiki.ui.button', 'mediawiki.ui.checkbox'], function () {
                $anchor.removeClass('ref-tooltip-loading');
                var $optionsText = $('<div>').addClass('ref-tooltip-options').append($('<div>').addClass('mw-ui-checkbox').append($('<input>').attr({
                    type: 'checkbox',
                    id: 'ref-tooltip-options-enabled',
                    checked: options.enabled
                }), $('<label>').attr('for', 'ref-tooltip-options-enabled').text(i18n.enableLabel)), $('<div>').addClass('ref-tooltip-actions').append($('<button>').addClass('mw-ui-button mw-ui-quiet').text(i18n.cancelButton).on('click.refTooltip', function () {
                    removeTooltip();
                }), $('<button>').addClass('mw-ui-button mw-ui-progressive').text(i18n.doneButton).on('click.refTooltip', function () {
                    options.enabled = $('#ref-tooltip-options-enabled').prop('checked');
                    var saveOptions = $.Deferred();
                    if (loggedIn) {
                        saveOptions = new mw.Api().postWithToken('csrf', {
                            action: 'options',
                            optionname: 'gadget-refTooltip',
                            optionvalue: options.enabled ? undefined : 0
                        });
                    } else {
                        try {
                            localStorage
                                .refTooltip = JSON.stringify(options);
                            saveOptions.resolve();
                        } catch (e) {
                            saveOptions.reject('storage');
                        }
                    }
                    saveOptions.then(function () {
                        removeTooltip();
                    }, function (code, error) {
                        mw.notify(code === 'storage' ? i18n.saveFailedStorageFull : error, {
                            title: i18n.saveFailedTitle
                        });
                    });
                })));
                createTooltip($anchor, $optionsText, false);
                $tooltip.on('refTooltip-close', function () {
                    if (options.enabled) {
                        bindRefHandlers();
                    }
                });
            });
        });
        if (options.enabled) {
            bindRefHandlers();
        }
    });
}, {
    "css": [
        ".ref-tooltip{position:absolute;margin-top:-29px;font-size:0.875em;z-index:9999}.ref-tooltip-text{border:1px solid #AAA;border-radius:2px;background-color:#FFF;box-shadow:0 2px 0 rgba(0,0,0,0.15);margin-top:-14px;margin-left:-21px;padding:0.5em 0.8em;font-size:smaller;min-width:20px;max-width:300px;word-wrap:break-word}.ref-tooltip-flipped \u003E .ref-tooltip-text{margin-top:13px}.ref-tooltip-text \u003E p:first-child{margin-top:0}.ref-tooltip-text \u003E p:last-child{margin-bottom:0}.ref-tooltip-arrow,.ref-tooltip-arrow:before,.ref-tooltip-arrow:after{content:\"\";position:absolute;bottom:-9px;left:-9px;border:10px solid;border-color:#888 transparent;border-bottom-style:none;width:0;height:0}.ref-tooltip-arrow:before{bottom:-3px;left:-10px;border-color:rgba(0,0,0,0.15) transparent}.ref-tooltip-arrow:after{bottom:1px;left:-9px;border-color:#FFF transparent;border-width:9px}.ref-tooltip-flipped \u003E .ref-tooltip-arrow,.ref-tooltip-flipped \u003E .ref-tooltip-arrow:after{bottom:auto;border-top-style:none;border-bottom-style:solid}.ref-tooltip-flipped \u003E .ref-tooltip-arrow{top:4px}.ref-tooltip-flipped \u003E .ref-tooltip-arrow:before{content:none}.ref-tooltip-flipped \u003E .ref-tooltip-arrow:after{top:1px}.ref-tooltip-options-button{display:inline-block;font:inherit;float:right;-webkit-appearance:none;border:none;outline:none;background:url(https://minecraft.gamepedia.com/media/minecraft.gamepedia.com/e/e0/Reference_options.png) no-repeat;margin:0.3em 0 0 0.5em;width:16px;height:16px;cursor:pointer}.ref-tooltip-options-button::-moz-focus-inner{border:none}.ref-tooltip-options-button.ref-tooltip-loading{animation:1s linear infinite rotate}.ref-tooltip-text .ref-tooltip-options-button{margin-top:-0.1em;margin-right:-0.3em}.ref-tooltip-options{padding:0.3em 0}.ref-tooltip-actions{margin-top:0.8em;text-align:right}"
    ]
});
