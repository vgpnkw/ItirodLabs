using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace UdpClientApp
{
    class Program
    {
        static string remoteAddress; // хост для отправки данных
        static int remotePort; // порт для отправки данных
        static int localPort; // локальный порт для прослушивания входящих подключений
        static Dictionary<int, string> order = new Dictionary<int, string>();
        static List<int> indexes = new List<int>();
        static string username;
        static int index;
        

        static void Main(string[] args)
        {
            try
            {
                Console.Write("Введите порт для прослушивания: "); // локальный порт
                localPort = Int32.Parse(Console.ReadLine());
                Console.Write("Введите удаленный адрес для подключения: ");
                remoteAddress = Console.ReadLine(); // адрес, к которому мы подключаемся
                Console.Write("Введите порт для подключения: ");
                remotePort = Int32.Parse(Console.ReadLine()); // порт, к которому мы подключаемся
                Console.Write("Введите свое имя:");
                username = Console.ReadLine();

                Thread receiveThread = new Thread(new ThreadStart(ReceiveMessage));
                receiveThread.Start();
                SendMessage(); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        private static void SendMessage()
        {
            UdpClient sender = new UdpClient(); // UdpClient для отправки сообщений
            try
            {
                while (true)
                {
                    string message = Console.ReadLine(); // сообщение для отправки
                    message = String.Format("{0}: {1}", username, message);
                    byte[] data = Encoding.Unicode.GetBytes(message);
                    sender.Send(data, data.Length, remoteAddress, remotePort); // отправка
                    order.Add(index, message);
                    index++;     
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                sender.Close();
            }
        }

        private static void ReceiveMessage()
        {
            UdpClient receiver = new UdpClient(localPort); // UdpClient для получения данных
            IPEndPoint remoteIp = null; // адрес входящего подключения
            try
            {
                while (true)
                {
                    byte[] data = receiver.Receive(ref remoteIp); // получаем данные
                    string message = Encoding.Unicode.GetString(data);

                    Chat();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                receiver.Close();
            }
        }

        private static void Chat()
        {
            Console.Clear();
            if(Check())
            {
                foreach (var i in order)
                {
                    Console.WriteLine(String.Format("{0}.{1}", i.Key, i.Value));
                }
            }
            


        }

        private static bool Check()
        {
            indexes.Clear();
            foreach (var i in order.Keys)
            {
                indexes.Add(i);        
            }
            if (indexes.Count > 1)
            {
                if (indexes[indexes.Count -1] - indexes[indexes.Count-2] != 1)
                {
                    Console.WriteLine("Сообщение утеряно!");
                    return false;
                }
                else return true;
            }
            else return true;



        }

    }
}