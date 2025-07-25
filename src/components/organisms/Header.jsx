import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { AuthContext } from '@/App';
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
const Header = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
              <p className="text-sm text-gray-600">Efficient Task Management</p>
            </div>
</div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ApperIcon name="Calendar" size={16} />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            
            <LogoutButton />
          </div>
        </div>
      </div>
    </motion.header>
);
};

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  if (!user) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logout}
      className="flex items-center gap-2 text-gray-600 hover:text-primary"
    >
      <ApperIcon name="LogOut" size={16} />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};

export default Header;