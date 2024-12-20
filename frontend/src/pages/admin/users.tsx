import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, MapPin, Loader2, UserCog } from "lucide-react";
import useUserStore from "@/store/user-store";
import { DeleteUserDialog } from "@/components/admin/delete-user";

export default function Users() {
    const { users, loading, fetchAllUsers, deleteUser } = useUserStore();
    const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleDelete = async () => {
        if (selectedUser) {
            await deleteUser(selectedUser.id);
            setSelectedUser(null);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[200px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Users 🙋🏻‍♂️</h1>
                <p className="text-sm text-muted-foreground">
                    Total users: {users.length}
                </p>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.email}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <UserCog className="h-4 w-4 text-muted-foreground" />
                                    <span className="capitalize">{user.role}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.address || "No address provided"}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedUser({ id: user.id, name: user.name })}
                                    disabled={user.role === 'admin'}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <DeleteUserDialog
                open={!!selectedUser}
                onOpenChange={(open) => !open && setSelectedUser(null)}
                onConfirm={handleDelete}
                userName={selectedUser?.name || ''}
            />
        </div>
    );
}