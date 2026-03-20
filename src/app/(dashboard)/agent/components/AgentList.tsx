"use client"
import React, { useEffect, useState } from "react";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import { Button } from "@/src/components/ui/Button";
import { AppPagination } from "@/src/components/ui/Pagination";
import { useUserAgentStore } from "@/src/store/userAgent/userAgent.store";
import { ActionMenu } from "@/src/components/ActionMenu";
import { DeleteConfirmationModal } from "@/src/components/ui/modal/DeleteConfirmationModal";
import { useToastStore } from "@/src/store/ui/toast.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";

const getStatusBadge = (status: string) => {
  const s = status?.toUpperCase() || "UNKNOWN";
  switch (s) {
    case "READY":
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-600 rounded-lg border border-green-100 font-bold text-[9px] uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          Ready
        </div>
      );
    case "PROCESSING":
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 font-bold text-[9px] uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-amber-500 animate-bounce" />
          Processing
        </div>
      );
    case "FAILED":
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-red-600 rounded-lg border border-red-100 font-bold text-[9px] uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-red-500" />
          Failed
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 text-gray-500 rounded-lg border border-gray-100 font-bold text-[9px] uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-gray-400" />
          {s}
        </div>
      );
  }
};

const AgentList = () => {
  const { userAgents, isLoading, fetchUserAgents, removeUserAgent, pagination } = useUserAgentStore();
  const { user } = useAuthStore();
  const { addToast } = useToastStore();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadAgents = async () => {
      if (!user?.id) return;
      try {
        await fetchUserAgents({
          userId: user.id,
          page: String(pagination.page),
          limit: String(pagination.pageSize)
        });
      } catch (error: any) {
        console.error("Failed to fetch agents:", error);
        addToast(error.message || "Failed to load agents", "error");
      }
    };
    loadAgents();
  }, [fetchUserAgents, addToast, user?.id, pagination.page, pagination.pageSize]);

  const handlePageChange = (newPage: number) => {
    if (!user?.id) return;
    fetchUserAgents({
      userId: user.id,
      page: String(newPage),
      limit: String(pagination.pageSize)
    });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedAgentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAgentId) {
      setIsDeleting(true);
      try {
        await removeUserAgent(selectedAgentId);
        addToast("Agent deleted successfully", "success");
        setIsDeleteModalOpen(false);
      } catch (error: any) {
        console.error("Failed to delete agent:", error);
        addToast(error.message || "Failed to delete agent", "error");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading && userAgents.length === 0) {
    return (
      <div className="flex flex-col flex-1 min-h-[calc(100vh-220px)] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground font-medium">Loading agents...</p>
      </div>
    );
  }

  if (!userAgents || userAgents.length === 0) {
    return (
      <div className="flex flex-col flex-1 min-h-[calc(100vh-280px)] items-center justify-center space-y-4 text-center">
        <div className="bg-primary/5 p-6 rounded-full">
          <Icon icon="solar:robot-bold-duotone" width={64} height={64} className="text-primary/30" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">No agents found</h3>
          <p className="text-muted-foreground mt-1 text-sm">You haven't created any agents yet. Start by creating one!</p>
        </div>
        <Button
          moveTo="/agent/add-agent"
          label="Create Your First Agent"
          variant="primary"
          className="mt-4 gap-2 font-bold px-6"
          icon={<Icon icon="solar:add-circle-bold" width={20} />}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-[calc(100vh-280px)] space-y-8 animate-in fade-in duration-500">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {userAgents.map((agent) => (
          <Cards key={agent.id} className="group hover:-translate-y-1 transition-all duration-300 overflow-visible">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="solar:robot-bold-duotone" width={24} height={24} />
                </div>
                <CardTitle className="text-base font-bold truncate max-w-[150px]">{agent.name}</CardTitle>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(agent.vectorStatus)}
                <ActionMenu
                  baseUrl="/agent"
                  id={agent.id}
                  detailUrl={`/agent/detail/${agent.id}`}
                  editUrl={`/agent/edit/${agent.id}`}
                  onDelete={() => handleDeleteClick(agent.id)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[80px]">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 font-medium bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50 italic">
                  {agent.prompt || "No custom instructions defined."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/5 text-primary rounded-lg border border-primary/10">
                  <Icon icon="solar:user-id-bold-duotone" width={12} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">{agent.agent?.replace(/-/g, ' ')}</span>
                </div>
                <Button
                  moveTo={`/agent/test-agent?id=${agent.id}`}
                  label="Test Agent"
                  variant="primary"
                  className="px-4 py-2.5 text-[10px] h-auto gap-2 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all"
                  icon={<Icon icon="solar:play-circle-bold" width={16} />}
                  iconPosition="left"
                />
              </div>
            </CardContent>
          </Cards>
        ))}
      </div>

      <div className="mt-auto sticky bottom-0 bg-[#F8F9FA]/80 backdrop-blur-sm flex justify-center pt-4 border-t border-gray-100 mb-2">
        <AppPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Agent"
        description="Are you sure you want to delete this agent? This action cannot be undone."
      />
    </div>
  );
};

export { AgentList };

