// components/Header.tsx
import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return (
        <Navbar variant="floating" isBordered>
            <Navbar.Brand>
                <Text weight="bold">Your App Name</Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Item>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <Avatar squared icon={<FontAwesomeIcon icon={faUser} width={24} />} />
                        </Dropdown.Trigger>
                        <Dropdown.Menu>
                            <Dropdown.Item key="Profile">Profile</Dropdown.Item>
                            <Dropdown.Item key="Settings">Settings</Dropdown.Item>
                            <Dropdown.Section>
                                <Dropdown.Item key="Logout" color="error">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Section>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
}
