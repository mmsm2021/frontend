import React, { useEffect, useState } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import {Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { FaUser } from "react-icons/all";
import { Button, Container, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import themes from "../configuration/themes";
import locations from "../configuration/locations";
import currency from "../configuration/currency";
import translations from "../configuration/translations";

export const ProfileRoutes = [
    {
        path: "/profile",
        exact: true,
        sidebar: <FormattedMessage id="profile" />,
        main: () => <Overview metadata={<Meta />} />,
    },
    {
        path: "/profile/history",
        sidebar: <FormattedMessage id="history" />,
        main: () => <FormattedMessage id="history" />
    },
    {
        path: "/profile/settings",
        sidebar: <FormattedMessage id="settings" />,
        main: () => < Settings />
    }
];

const Meta = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    return (
        isAuthenticated && (
            <div>
                <h3>User Metadata</h3>
                {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
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
            <h2><FormattedMessage id={"profile"} /></h2>
            {props.metadata}
        </div>
    )
}

function Settings() {
    let userToken = localStorage.getItem("bearer").split('.');
    let buff = new Buffer(userToken[1], 'base64');

    let tokenPayload = JSON.parse(buff.toString('ascii'));
    let profileSettings = tokenPayload[['https://frandine.randomphp.com/user_metadata']];

    // let languages = [{name: 'Dansk', value: 'da-DK'}, {name:'English', value: 'en_GB'}, {name: 'Deutsch', value: 'de-DE'}];

    let langMenu = Object.keys(translations);
    let themeMenu = Object.keys(themes);
    let locMenu = Object.keys(locations);
    let currencyMenu = Object.keys(currency);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h2><FormattedMessage id={"settings"} /></h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label><FormattedMessage id={"language"} /></Form.Label>
                                {[DropdownButton].map((DropdownType, idx) => (
                                    <DropdownType
                                        key={idx}
                                        id={`dropdown-button-drop-${idx}`}
                                        size="sm"
                                        variant="secondary"
                                        title={<FormattedMessage id={"language"} />}
                                    >
                                        {langMenu.map((lang) => {
                                            return <Dropdown.Item value={lang}>{translations[lang]['langName']}</Dropdown.Item>
                                        })}
                                    </DropdownType>
                                ))}
                                <Form.Text className="text-muted">
                                    <FormattedMessage id={"desiredLanguage"} />
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label><FormattedMessage id={"colorTheme"} /></Form.Label>
                            {[DropdownButton].map((DropdownType, idx) => (
                                <DropdownType
                                    key={idx}
                                    id={`dropdown-button-drop-${idx}`}
                                    size="sm"
                                    variant="secondary"
                                    title={themes[profileSettings['theme']]}
                                >
                                    {themeMenu.map((theme) => {
                                        return <Dropdown.Item value={theme}>{themes[theme]}</Dropdown.Item>
                                    })}
                                </DropdownType>
                            ))}
                            <Form.Text className="text-muted">
                                <FormattedMessage id={"desiredTheme"} />
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label><FormattedMessage id={"location"} /></Form.Label>
                                {[DropdownButton].map((DropdownType, idx) => (
                                    <DropdownType
                                        key={idx}
                                        id={`dropdown-button-drop-${idx}`}
                                        size="sm"
                                        variant="secondary"
                                        title={<FormattedMessage id={"location"} />}
                                    >
                                        {locMenu.map((loc) => {
                                            console.log(loc);
                                            return <Dropdown.Item value={loc}>{locations[loc]}</Dropdown.Item>
                                        })}
                                    </DropdownType>
                                ))}
                                <Form.Text className="text-muted">
                                    <FormattedMessage id={"assignedLocation"} />
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label><FormattedMessage id={"currency"} /></Form.Label>
                                {[DropdownButton].map((DropdownType, idx) => (
                                    <DropdownType
                                        key={idx}
                                        id={`dropdown-button-drop-${idx}`}
                                        size="sm"
                                        variant="secondary"
                                        title={<FormattedMessage id={"currency"} />}
                                    >
                                        {currencyMenu.map((cur) => {
                                            return <Dropdown.Item value={cur}>{currency[cur]}</Dropdown.Item>
                                        })}
                                    </DropdownType>
                                ))}
                                <Form.Text className="text-muted">
                                    <FormattedMessage id={"desiredCurrency"} />
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" type="submit">
                        <FormattedMessage id={"save"} />
                    </Button>
                </Row>
            </Container>
        </div>
    )
}

