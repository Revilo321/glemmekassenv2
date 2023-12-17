'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-b2655b807ec59f1b350dd5d88f8d5a924b5f632c34b3f0257e106373815ef641503da85e879a47fae0d9e556800e49aea5e47cc8e8ebd76de0f98fbb9d16a884"' : 'data-bs-target="#xs-components-links-module-AppModule-b2655b807ec59f1b350dd5d88f8d5a924b5f632c34b3f0257e106373815ef641503da85e879a47fae0d9e556800e49aea5e47cc8e8ebd76de0f98fbb9d16a884"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b2655b807ec59f1b350dd5d88f8d5a924b5f632c34b3f0257e106373815ef641503da85e879a47fae0d9e556800e49aea5e47cc8e8ebd76de0f98fbb9d16a884"' :
                                            'id="xs-components-links-module-AppModule-b2655b807ec59f1b350dd5d88f8d5a924b5f632c34b3f0257e106373815ef641503da85e879a47fae0d9e556800e49aea5e47cc8e8ebd76de0f98fbb9d16a884"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChatOverviewPageModule.html" data-type="entity-link" >ChatOverviewPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChatOverviewPageModule-4f0ac539148eedbef67f4cea0cdd40b8add0e157d10a0516beaaa50397a1343c4922e6c531b8d445af3cfc6c2a838069b4a730db6e4cb3698b491759e09e4fc1"' : 'data-bs-target="#xs-components-links-module-ChatOverviewPageModule-4f0ac539148eedbef67f4cea0cdd40b8add0e157d10a0516beaaa50397a1343c4922e6c531b8d445af3cfc6c2a838069b4a730db6e4cb3698b491759e09e4fc1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatOverviewPageModule-4f0ac539148eedbef67f4cea0cdd40b8add0e157d10a0516beaaa50397a1343c4922e6c531b8d445af3cfc6c2a838069b4a730db6e4cb3698b491759e09e4fc1"' :
                                            'id="xs-components-links-module-ChatOverviewPageModule-4f0ac539148eedbef67f4cea0cdd40b8add0e157d10a0516beaaa50397a1343c4922e6c531b8d445af3cfc6c2a838069b4a730db6e4cb3698b491759e09e4fc1"' }>
                                            <li class="link">
                                                <a href="components/ChatOverviewPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatOverviewPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatOverviewPageRoutingModule.html" data-type="entity-link" >ChatOverviewPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CreatePageModule.html" data-type="entity-link" >CreatePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CreatePageModule-049815ddf844b937b0f1788309bf544e8b7cb62181f369ecd2e420247d52126c23acd89e30428f92740c7f3b39d12544f233000527aa2009610624721220f8ea"' : 'data-bs-target="#xs-components-links-module-CreatePageModule-049815ddf844b937b0f1788309bf544e8b7cb62181f369ecd2e420247d52126c23acd89e30428f92740c7f3b39d12544f233000527aa2009610624721220f8ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CreatePageModule-049815ddf844b937b0f1788309bf544e8b7cb62181f369ecd2e420247d52126c23acd89e30428f92740c7f3b39d12544f233000527aa2009610624721220f8ea"' :
                                            'id="xs-components-links-module-CreatePageModule-049815ddf844b937b0f1788309bf544e8b7cb62181f369ecd2e420247d52126c23acd89e30428f92740c7f3b39d12544f233000527aa2009610624721220f8ea"' }>
                                            <li class="link">
                                                <a href="components/CreatePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CreatePageRoutingModule.html" data-type="entity-link" >CreatePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExploreContainerComponentModule.html" data-type="entity-link" >ExploreContainerComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' : 'data-bs-target="#xs-components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' :
                                            'id="xs-components-links-module-ExploreContainerComponentModule-f6ea2f3a37a409e782e878132417e160cf77fa0ec810d2e5cc3642af37918fb50562eba3a5194cf88483d3cbd97cd30c37d5f4767ebce2bf4dbbd50f06e2def3"' }>
                                            <li class="link">
                                                <a href="components/ExploreContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExploreContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-eaf51d5cdd0c2a7ea6a39c682c6aa2ba6b1d2b91b06b048209f0baff3fc32460a7cd0adaca7f8744b8550a9e35d78fb971be7a063bd2b9c119f6eb113417da01"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-eaf51d5cdd0c2a7ea6a39c682c6aa2ba6b1d2b91b06b048209f0baff3fc32460a7cd0adaca7f8744b8550a9e35d78fb971be7a063bd2b9c119f6eb113417da01"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-eaf51d5cdd0c2a7ea6a39c682c6aa2ba6b1d2b91b06b048209f0baff3fc32460a7cd0adaca7f8744b8550a9e35d78fb971be7a063bd2b9c119f6eb113417da01"' :
                                            'id="xs-components-links-module-LoginPageModule-eaf51d5cdd0c2a7ea6a39c682c6aa2ba6b1d2b91b06b048209f0baff3fc32460a7cd0adaca7f8744b8550a9e35d78fb971be7a063bd2b9c119f6eb113417da01"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesPageModule.html" data-type="entity-link" >MessagesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MessagesPageModule-0e55b47e56af1fe65142558e35cccd52a72dac6477f39bed4e35b638991affb9c8b1525dc6e06b2af820b75b38c222f28e29ad8cfeab4b2d0b6dfbfd7889fced"' : 'data-bs-target="#xs-components-links-module-MessagesPageModule-0e55b47e56af1fe65142558e35cccd52a72dac6477f39bed4e35b638991affb9c8b1525dc6e06b2af820b75b38c222f28e29ad8cfeab4b2d0b6dfbfd7889fced"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MessagesPageModule-0e55b47e56af1fe65142558e35cccd52a72dac6477f39bed4e35b638991affb9c8b1525dc6e06b2af820b75b38c222f28e29ad8cfeab4b2d0b6dfbfd7889fced"' :
                                            'id="xs-components-links-module-MessagesPageModule-0e55b47e56af1fe65142558e35cccd52a72dac6477f39bed4e35b638991affb9c8b1525dc6e06b2af820b75b38c222f28e29ad8cfeab4b2d0b6dfbfd7889fced"' }>
                                            <li class="link">
                                                <a href="components/MessagesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesPageRoutingModule.html" data-type="entity-link" >MessagesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' :
                                            'id="xs-components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' }>
                                            <li class="link">
                                                <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-5c775a94b18141161f6b6d1ab0416390c5b41bf6318d097c5bb66f75afa8b5dae573e310e92245f0639ad0347e0824fc9f07a8f4ebdc7fa1515db9a9de6ad3d6"' : 'data-bs-target="#xs-components-links-module-SharedModule-5c775a94b18141161f6b6d1ab0416390c5b41bf6318d097c5bb66f75afa8b5dae573e310e92245f0639ad0347e0824fc9f07a8f4ebdc7fa1515db9a9de6ad3d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-5c775a94b18141161f6b6d1ab0416390c5b41bf6318d097c5bb66f75afa8b5dae573e310e92245f0639ad0347e0824fc9f07a8f4ebdc7fa1515db9a9de6ad3d6"' :
                                            'id="xs-components-links-module-SharedModule-5c775a94b18141161f6b6d1ab0416390c5b41bf6318d097c5bb66f75afa8b5dae573e310e92245f0639ad0347e0824fc9f07a8f4ebdc7fa1515db9a9de6ad3d6"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderPageSectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderPageSectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SegmentControlComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SegmentControlComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageModule.html" data-type="entity-link" >Tab1PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab1PageModule-2a7b061a41012339125e35ab8ae0969b008cf7927b96a944d6a7a630329713e33caf0d22ff04952b8af2fe44af42fedc15cdd190569d772b5ad41199ebeb2ff3"' : 'data-bs-target="#xs-components-links-module-Tab1PageModule-2a7b061a41012339125e35ab8ae0969b008cf7927b96a944d6a7a630329713e33caf0d22ff04952b8af2fe44af42fedc15cdd190569d772b5ad41199ebeb2ff3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab1PageModule-2a7b061a41012339125e35ab8ae0969b008cf7927b96a944d6a7a630329713e33caf0d22ff04952b8af2fe44af42fedc15cdd190569d772b5ad41199ebeb2ff3"' :
                                            'id="xs-components-links-module-Tab1PageModule-2a7b061a41012339125e35ab8ae0969b008cf7927b96a944d6a7a630329713e33caf0d22ff04952b8af2fe44af42fedc15cdd190569d772b5ad41199ebeb2ff3"' }>
                                            <li class="link">
                                                <a href="components/Tab1Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab1Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageRoutingModule.html" data-type="entity-link" >Tab1PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageModule.html" data-type="entity-link" >Tab2PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab2PageModule-2f5a9dcaa2fcb03c6105e12f4d0080118e2bcd1c3bb651348d0ff7f0abf2a6a85a8def9437929508517f7528cc419fa023d2aa72dc6b29a147c582a95be3dc30"' : 'data-bs-target="#xs-components-links-module-Tab2PageModule-2f5a9dcaa2fcb03c6105e12f4d0080118e2bcd1c3bb651348d0ff7f0abf2a6a85a8def9437929508517f7528cc419fa023d2aa72dc6b29a147c582a95be3dc30"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab2PageModule-2f5a9dcaa2fcb03c6105e12f4d0080118e2bcd1c3bb651348d0ff7f0abf2a6a85a8def9437929508517f7528cc419fa023d2aa72dc6b29a147c582a95be3dc30"' :
                                            'id="xs-components-links-module-Tab2PageModule-2f5a9dcaa2fcb03c6105e12f4d0080118e2bcd1c3bb651348d0ff7f0abf2a6a85a8def9437929508517f7528cc419fa023d2aa72dc6b29a147c582a95be3dc30"' }>
                                            <li class="link">
                                                <a href="components/Tab2Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab2Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageRoutingModule.html" data-type="entity-link" >Tab2PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link" >Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-Tab3PageModule-8a513e21870ca5c4137a1f59a3fa769a3a66c60fc02f2c80e0ea68c23842c16942778c434e8a226f207525ff4227df8f83c9a1ecbeefc26840cea02dd1078273"' : 'data-bs-target="#xs-components-links-module-Tab3PageModule-8a513e21870ca5c4137a1f59a3fa769a3a66c60fc02f2c80e0ea68c23842c16942778c434e8a226f207525ff4227df8f83c9a1ecbeefc26840cea02dd1078273"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-8a513e21870ca5c4137a1f59a3fa769a3a66c60fc02f2c80e0ea68c23842c16942778c434e8a226f207525ff4227df8f83c9a1ecbeefc26840cea02dd1078273"' :
                                            'id="xs-components-links-module-Tab3PageModule-8a513e21870ca5c4137a1f59a3fa769a3a66c60fc02f2c80e0ea68c23842c16942778c434e8a226f207525ff4227df8f83c9a1ecbeefc26840cea02dd1078273"' }>
                                            <li class="link">
                                                <a href="components/Tab3Page.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageRoutingModule.html" data-type="entity-link" >Tab3PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link" >TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' : 'data-bs-target="#xs-components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' :
                                            'id="xs-components-links-module-TabsPageModule-dc93590fcd51989cf2be001df22f204fb41bc791691c0515c89872850cdf21bdbc804a684cd85920a619fe6af992e60c324587eb378529eb406f77d16a295454"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link" >TabsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TermsAndConditionsPageModule.html" data-type="entity-link" >TermsAndConditionsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TermsAndConditionsPageModule-cca6f6839e1f08bcc60e337e5631a62ed98923e07a47704366522ffc27c9f5b3469bc1584fe39ecc31194351a02625d79c4b60118dddb422f74a31d6e0a67954"' : 'data-bs-target="#xs-components-links-module-TermsAndConditionsPageModule-cca6f6839e1f08bcc60e337e5631a62ed98923e07a47704366522ffc27c9f5b3469bc1584fe39ecc31194351a02625d79c4b60118dddb422f74a31d6e0a67954"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TermsAndConditionsPageModule-cca6f6839e1f08bcc60e337e5631a62ed98923e07a47704366522ffc27c9f5b3469bc1584fe39ecc31194351a02625d79c4b60118dddb422f74a31d6e0a67954"' :
                                            'id="xs-components-links-module-TermsAndConditionsPageModule-cca6f6839e1f08bcc60e337e5631a62ed98923e07a47704366522ffc27c9f5b3469bc1584fe39ecc31194351a02625d79c4b60118dddb422f74a31d6e0a67954"' }>
                                            <li class="link">
                                                <a href="components/TermsAndConditionsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermsAndConditionsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TermsAndConditionsPageRoutingModule.html" data-type="entity-link" >TermsAndConditionsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link" >ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormService.html" data-type="entity-link" >FormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemService.html" data-type="entity-link" >ItemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocketService.html" data-type="entity-link" >SocketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastService.html" data-type="entity-link" >ToastService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});