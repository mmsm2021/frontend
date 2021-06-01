import React, { useEffect, useState } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import {Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { FaUser } from "react-icons/all";
import { Button, Container, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {FaUser} from "react-icons/all";
import {Button, Col, Container, Form} from "react-bootstrap";
import themes from "../configuration/themes";
import locations from "../configuration/locations";
import currency from "../configuration/currency";
import translations from "../configuration/translations";

export const ProfileRoutes = [
    {
        path: "/profile",
        exact: true,
        sidebar: <FormattedMessage id="profile"/>,
        main: () => <Overview metadata={<Meta/>}/>,
    },
    {
        path: "/profile/history",
        sidebar: <FormattedMessage id="history"/>,
        main: () => <FormattedMessage id="history"/>
    },
    {
        path: "/profile/settings",
        sidebar: <FormattedMessage id="settings"/>,
        main: () => < Settings/>
    }
];

const Meta = () => {
    const {user, isAuthenticated} = useAuth0();
    const [userMetadata] = useState(user);
    let frandineMetaKeys = Object.keys(userMetadata['https://frandine.randomphp.com/user_metadata']);
    let genMetaKeys = Object.keys(userMetadata);
    return (
        isAuthenticated && (
            <div>
                {userMetadata ? (
                    <div>
                        <div className="row align-items-center profile-header">
                            <div className="col-md-2 mb-3">
                                <img
                                    src={userMetadata['picture']}
                                    alt="Profile"
                                    className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                                />
                            </div>
                            <div className="col-md text-center text-md-left">
                                <h2>{userMetadata['name']}</h2>
                                <p className="lead text-muted">{userMetadata['email']}</p>
                            </div>
                        </div>
                        <div className="col-md text-center text-md-left card-header">
                            FranDine user type:
                        </div>
                        {user['https://frandine.randomphp.com/roles'].map(role => {
                            return <div className="text-md-center">{role}</div>
                        })}
                        <div className="col-md text-center text-md-left card-header">
                            FranDine user meta data:
                        </div>
                        {frandineMetaKeys.map((key) => {
                            return <div
                                className="text-md-center">{key} : {user['https://frandine.randomphp.com/user_metadata'][key]}</div>
                        })}
                        <div className="col-md text-center text-md-left card-header">
                            General meta data:
                        </div>
                        {genMetaKeys.map((key) => {
                            if (!key.includes('https') && !key.includes('picture')) {
                                return <div className="text-md-center">
                                    {key} : {userMetadata[key]}
                                </div>
                            }
                            return null
                        })}
                    </div>
                ) : (
                    "No user metadata defined"
                )}
            </div>
        )
    );
}


export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowed: false,
            data: [],

        }
    }

    render() {
        const routes = ProfileRoutes;

        return (
            <Menu iconShape={"circle"}>
                <SubMenu title={<FormattedMessage id={"account"} />}
                    icon={<FaUser />}>
                    {routes.map((route, index) => (
                        <MenuItem key={index}>
                            <Link to={route.path}>{route.sidebar}</Link>
                        </MenuItem>
                    ))}
                </SubMenu>
            </Menu>

        )
    }

}

function Overview(props) {
    return (
        <div>
            <h2><FormattedMessage id={"profile"}/></h2>
            {props.metadata}
        </div>
    )
}

function Settings() {
    const {user} = useAuth0();
    const [userMetadata] = useState(user['https://frandine.randomphp.com/user_metadata']);
    let langMenu = Object.keys(translations);
    let themeMenu = Object.keys(themes);
    let locMenu = Object.keys(locations);
    let currencyMenu = Object.keys(currency);

    return (
        <div>
            <Container>
                <h2><FormattedMessage id={"settings"}/></h2>
                <Form>

                    <Form.Row>
                        <Form.Group as={Col} controlId="languageSelect">
                            <Form.Label><FormattedMessage id={"language"}/></Form.Label>
                            <Form.Control as="select"
                                          defaultValue={translations[userMetadata['locale'].substring(0, 2)]['langName']}>
                                {
                                    langMenu.map((key) => {
                                            return <option>{translations[key]['langName']}</option>
                                        }
                                    )
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="colorthemeSelect">
                            <Form.Label><FormattedMessage id={"colorTheme"}/></Form.Label>
                            <Form.Control as="select" defaultValue={userMetadata['theme']}>
                                {
                                    themeMenu.map((key) => {
                                            return <option value={key}>{themes[key]}</option>
                                        }
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="locationSelect">
                            <Form.Label><FormattedMessage id={"location"}/></Form.Label>
                            <Form.Control as="select" defaultValue={userMetadata['location']}>
                                {
                                    locMenu.map((key) => {
                                            return <option value={key}>{locations[key]}</option>
                                        }
                                    )
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="currencySelect">
                            <Form.Label><FormattedMessage id={"currency"}/></Form.Label>
                            <Form.Control as="select" defaultValue={userMetadata['currency']}>
                                {
                                    currencyMenu.map((key) => {
                                            return <option value={key}>{currency[key]}</option>
                                        }
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </Container>
        </div>
    )
}

