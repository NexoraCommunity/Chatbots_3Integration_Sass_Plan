import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import BarChartDashboard from "@/src/components/ui/BarChart";
import { Checkbox } from "@/src/components/ui/Checkbox";
import GaugeChart from "@/src/components/ui/GaugeChart";
import { Switch } from "@/src/components/ui/Switch";
import { Icon } from "@iconify/react";


const page = () => {
  const stats = [
    { label: "Total Bot Aktif", value: "10 Bot", icon: "fluent:bot-24-filled", color: "text-primary", bg: "bg-primary/10" },
    { label: "Total Agent", value: "5 Agent", icon: "solar:users-group-rounded-bold-duotone", color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Total Pesan", value: "250 Pesan", icon: "solar:chat-round-dots-bold-duotone", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Penggunaan Token", value: "970 Token", icon: "solar:wallet-money-bold-duotone", color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <Cards key={i} className="group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl transition-colors`}>
                  <Icon icon={stat.icon} width={28} height={28} />
                </div>
                <div className="bg-gray-50 text-gray-400 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon icon="solar:arrow-right-up-bold" width={16} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Cards>
        ))}
      </div>

      {/* Bagian Chart */}
      <Cards className="p-2 lg:p-4">
        <CardHeader className="px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">
            <div>
              <CardTitle className="text-lg md:text-xl font-bold">Pesan Terbalas & Penggunaan Token</CardTitle>
              <p className="text-xs md:text-sm text-muted-foreground">Statistik performa chatbot dalam 7 hari terakhir</p>
            </div>
            <div className="flex self-start sm:self-auto gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-[10px] md:text-xs font-bold rounded-lg cursor-pointer hover:bg-primary/20 transition-colors">
                Last 7 Days
                <Icon icon="solar:alt-arrow-down-bold" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[300px] md:h-[400px] px-2 md:px-6 pb-6">
          <BarChartDashboard />
        </CardContent>
      </Cards>

      {/* Bagian bawah */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Cards className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:link-bold-duotone" className="text-primary" />
              Connected Platforms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Baileys", status: "Aktif", icon: "logos:whatsapp-icon" },
              { label: "Bot Father", status: "Nonaktif", icon: "mdi:telegram", color: "bg-blue-500" },
              { label: "Whatsapp Business", status: "Nonaktif", icon: "logos:whatsapp-icon" },
              { label: "Website", status: "Nonaktif", icon: "solar:globus-bold-duotone", color: "bg-amber-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:bg-gray-50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  {item.color ? (
                    <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center text-white`}>
                      <Icon icon={item.icon} width={24} height={24} />
                    </div>
                  ) : (
                    <Icon icon={item.icon} width={32} />
                  )}
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{item.label}</p>
                    <p className={`text-xs ${item.status === 'Aktif' ? 'text-green-500 font-bold' : 'text-gray-400 font-medium'}`}>{item.status}</p>
                  </div>
                </div>
                <Checkbox className="peer-checked:scale-110 transition-transform" />
              </div>
            ))}
          </CardContent>
        </Cards>

        <Cards className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:widget-bold-duotone" className="text-primary" />
              Kestabilan Token
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="scale-[1.15] mb-10 mt-6 relative">
              <GaugeChart />
              <div className="absolute inset-x-0 bottom-0 text-center">
                <span className="text-2xl font-black text-primary">85%</span>
              </div>
            </div>
            <div className="w-full space-y-4 px-2">
              {[
                { label: "Optimal", color: "text-green-500", value: "2000 Token" },
                { label: "Stabil", color: "text-teal-400", value: "2000 Token" },
                { label: "Menipis", color: "text-amber-400", value: "2000 Token" },
                { label: "Kritis", color: "text-red-500", value: "2000 Token" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                  <span className="text-muted-foreground font-semibold">{item.label}</span>
                  <span className={`font-black ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Cards>

        <Cards className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon icon="solar:box-bold-duotone" className="text-primary" />
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between group p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary/15 group-hover:text-primary transition-all duration-300">
                    <Icon icon="solar:archive-bold-duotone" width={28} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">Sapu Ijuk</p>
                    <p className="text-[10px] text-muted-foreground font-bold font-mono mt-0.5 opacity-60">REF: SPU-0001</p>
                  </div>
                </div>
                <div className="scale-90">
                  <Switch checked={i === 0} />
                </div>
              </div>
            ))}
          </CardContent>
        </Cards>
      </div>
    </div>
  );
};

export default page;
